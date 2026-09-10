export interface Stock {
  name: string;
  symbol: string;
  exchange: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercent: number;
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  peRatio: number | null;
  latestEarnings: string | null;
  error: string | null;
}

export interface PortfolioApiResponse {
  success: boolean;
  count: number;
  lastUpdated: string;
  data: Stock[];
}

export interface SectorSummary {
  sector: string;
  investment: number;
  currentValue: number;
  gainLoss: number;
  returnPercent: number | null;
}

export interface PortfolioTotals {
  totalInvestment: number;
  currentValue: number;
  totalGainLoss: number;
  overallReturnPercent: number;
}
