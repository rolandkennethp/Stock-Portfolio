export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  buyPrice: number;
  quantity: number;
  cmp: number;
  peRatio: number | null;
  eps: number | null;
  latestEarningsQuarter: string | null;
  latestEarningsCr: number | null;
}

export interface StockWithMetrics extends Stock {
  investment: number;
  presentValue: number; // cmp * quantity
  gainLoss: number; // presentValue - investment
  returnPercent: number; // gainLoss / investment * 100
}

export interface SectorSummary {
  sector: string;
  investment: number;
  currentValue: number;
  gainLoss: number;
  returnPercent: number | null; // null when there's no investment in this sector
}

export interface PortfolioTotals {
  totalInvestment: number;
  currentValue: number;
  totalGainLoss: number;
  overallReturnPercent: number;
}
