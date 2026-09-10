import { Stock, SectorSummary, PortfolioTotals } from "./types";

export function calculatePortfolioTotals(stocks: Stock[]): PortfolioTotals {
  const totalInvestment = stocks.reduce((sum, s) => sum + s.investment, 0);
  const currentValue = stocks.reduce(
    (sum, s) => sum + (s.presentValue ?? 0),
    0,
  );
  const totalGainLoss = currentValue - totalInvestment;
  const overallReturnPercent =
    totalInvestment === 0 ? 0 : (totalGainLoss / totalInvestment) * 100;

  return { totalInvestment, currentValue, totalGainLoss, overallReturnPercent };
}

export function calculateSectorSummaries(
  stocks: Stock[],
  sectors: string[],
): SectorSummary[] {
  return sectors.map((sector) => {
    const sectorStocks = stocks.filter((s) => s.sector === sector);
    const investment = sectorStocks.reduce((sum, s) => sum + s.investment, 0);
    const currentValue = sectorStocks.reduce(
      (sum, s) => sum + (s.presentValue ?? 0),
      0,
    );
    const gainLoss = currentValue - investment;
    const returnPercent =
      investment === 0 ? null : (gainLoss / investment) * 100;

    return { sector, investment, currentValue, gainLoss, returnPercent };
  });
}

export function getUniqueSectors(stocks: Stock[]): string[] {
  return Array.from(new Set(stocks.map((s) => s.sector)));
}
