const STATIC_PORTFOLIO = require("../data/portfolio");
const { fetchStockMarketData } = require("./yahooFinanceService");
const {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
  calculatePortfolioPercent,
} = require("../utils/calculations");

// The frontend polls roughly every 15s. Caching for 20s means most
// polls are served from memory instead of hitting Yahoo again —
// enough headroom that a slightly slow poll cycle doesn't cause a
// cache miss on every single request.
const CACHE_DURATION_MS = 20 * 1000;

let cache = { data: null, fetchedAt: 0 };

function isCacheFresh() {
  return (
    cache.data !== null && Date.now() - cache.fetchedAt < CACHE_DURATION_MS
  );
}

// Fetches live market data for every stock concurrently, then combines
// it with the static portfolio data and the calculated fields.
//
// Promise.allSettled (not Promise.all) is deliberate: if one stock's
// Yahoo request fails (bad symbol, network blip, rate limit), we still
// want the other 25 stocks in the response. Promise.all would reject
// the whole batch the moment any single request fails.
async function buildPortfolioWithMarketData() {
  const marketDataResults = await Promise.allSettled(
    STATIC_PORTFOLIO.map((stock) =>
      fetchStockMarketData(stock.symbol, stock.exchange),
    ),
  );

  const stocksWithoutPercent = STATIC_PORTFOLIO.map((stock, index) => {
    const investment = calculateInvestment(stock.purchasePrice, stock.quantity);
    const result = marketDataResults[index];

    if (result.status === "rejected") {
      console.error(
        `[${stock.symbol}] market data fetch failed:`,
        result.reason.message,
      );
      return {
        ...stock,
        investment,
        cmp: null,
        presentValue: null,
        gainLoss: null,
        peRatio: null,
        latestEarnings: null,
        error: "Unable to retrieve market data",
      };
    }

    const { cmp, peRatio, latestEarnings } = result.value;
    const presentValue = calculatePresentValue(cmp, stock.quantity);
    const gainLoss = calculateGainLoss(presentValue, investment);

    return {
      ...stock,
      investment,
      cmp,
      presentValue,
      gainLoss,
      peRatio,
      latestEarnings,
      error: null,
    };
  });

  const totalInvestment = stocksWithoutPercent.reduce(
    (sum, s) => sum + s.investment,
    0,
  );

  return stocksWithoutPercent.map((stock) => ({
    ...stock,
    portfolioPercent: calculatePortfolioPercent(
      stock.investment,
      totalInvestment,
    ),
  }));
}

async function getPortfolioWithMarketData() {
  if (isCacheFresh()) {
    return cache.data;
  }

  const freshData = await buildPortfolioWithMarketData();
  cache = { data: freshData, fetchedAt: Date.now() };
  return freshData;
}

module.exports = { getPortfolioWithMarketData };
