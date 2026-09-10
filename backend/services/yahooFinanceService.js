const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance();

// Yahoo Finance identifies NSE tickers with a ".NS" suffix and BSE
// tickers with ".BO". All our stocks are NSE, but this stays generic
// in case that changes later.
function buildYahooTicker(symbol, exchange) {
  const suffix = exchange === "BSE" ? ".BO" : ".NS";
  return `${symbol}${suffix}`;
}

// Yahoo labels quarters like "1Q2027". This just makes it read a
// little more naturally as "Q1 2027". Falls back to the raw label
// if the format doesn't match (rather than throwing).
function formatQuarterLabel(rawLabel) {
  const match = /^(\d)Q(\d{4})$/.exec(rawLabel || "");
  return match ? `Q${match[1]} ${match[2]}` : rawLabel;
}

// Fetches CMP, P/E ratio, and the latest quarterly earnings for one
// stock, in a single Yahoo Finance request.
//
// We use Yahoo for all three (not just CMP) instead of also scraping
// Google Finance — see README "P/E and earnings data source" section
// for the reasoning.
async function fetchStockMarketData(symbol, exchange) {
  const ticker = buildYahooTicker(symbol, exchange);

  const result = await yahooFinance.quoteSummary(ticker, {
    modules: ["price", "summaryDetail", "defaultKeyStatistics", "earnings"],
  });

  const cmp = result.price?.regularMarketPrice ?? null;
  const peRatio = result.summaryDetail?.trailingPE ?? null;

  const quarterlyEarnings = result.earnings?.financialsChart?.quarterly ?? [];
  const latestQuarter = quarterlyEarnings[quarterlyEarnings.length - 1];

  let latestEarnings = null;
  if (latestQuarter) {
    const quarterLabel = formatQuarterLabel(latestQuarter.date);
    // Yahoo returns net income in raw INR; 1 crore = 1e7 INR.
    const netIncomeCr = (latestQuarter.earnings / 1e7).toFixed(2);
    latestEarnings = `${quarterLabel} · ₹${netIncomeCr} Cr`;
  }

  if (cmp === null) {
    throw new Error(`No regularMarketPrice returned for ${ticker}`);
  }

  return { cmp, peRatio, latestEarnings };
}

module.exports = { fetchStockMarketData, buildYahooTicker };
