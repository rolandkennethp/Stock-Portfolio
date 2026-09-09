import {
  Stock,
  StockWithMetrics,
  SectorSummary,
  PortfolioTotals,
} from "./types";

export function addCalculatedFields(stock: Stock): StockWithMetrics {
  const investment = stock.buyPrice * stock.quantity;
  const presentValue = stock.cmp * stock.quantity;
  const gainLoss = presentValue - investment;
  const returnPercent = investment === 0 ? 0 : (gainLoss / investment) * 100;

  return { ...stock, investment, presentValue, gainLoss, returnPercent };
}

export function calculatePortfolioTotals(
  stocks: StockWithMetrics[],
): PortfolioTotals {
  const totalInvestment = stocks.reduce((sum, s) => sum + s.investment, 0);
  const currentValue = stocks.reduce((sum, s) => sum + s.presentValue, 0);
  const totalGainLoss = currentValue - totalInvestment;
  const overallReturnPercent =
    totalInvestment === 0 ? 0 : (totalGainLoss / totalInvestment) * 100;

  return { totalInvestment, currentValue, totalGainLoss, overallReturnPercent };
}

export function calculateSectorSummaries(
  stocks: StockWithMetrics[],
  sectors: string[],
): SectorSummary[] {
  return sectors.map((sector) => {
    const sectorStocks = stocks.filter((s) => s.sector === sector);
    const investment = sectorStocks.reduce((sum, s) => sum + s.investment, 0);
    const currentValue = sectorStocks.reduce(
      (sum, s) => sum + s.presentValue,
      0,
    );
    const gainLoss = currentValue - investment;
    const returnPercent =
      investment === 0 ? null : (gainLoss / investment) * 100;

    return { sector, investment, currentValue, gainLoss, returnPercent };
  });
}
