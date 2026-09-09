"use client";

import { useEffect, useState } from "react";
import { StockWithMetrics } from "@/lib/types";
import { fetchPortfolio } from "@/lib/api";
import {
  addCalculatedFields,
  calculatePortfolioTotals,
  calculateSectorSummaries,
} from "@/lib/portfolioCalculations";
import { SECTORS } from "@/lib/mockData";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioSummaryCards from "@/components/PortfolioSummaryCards";
import SectorSummaryTable from "@/components/SectorSummaryTable";
import StockHoldingsTable from "@/components/StockHoldingsTable";
import StockDetailPanel from "@/components/StockDetailPanel";

export default function PortfolioPage() {
  const [stocks, setStocks] = useState<StockWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockWithMetrics | null>(
    null,
  );

  const loadPortfolio = async (isRefresh: boolean) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const rawStocks = await fetchPortfolio();

      setStocks(rawStocks.map(addCalculatedFields));
      setLastUpdated(new Date());
    } catch {
      setError("Could not load portfolio data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const loadInitialPortfolio = async () => {
      setLoading(true);
      setError(null);

      try {
        const rawStocks = await fetchPortfolio();

        setStocks(rawStocks.map(addCalculatedFields));
        setLastUpdated(new Date());
      } catch {
        setError("Could not load portfolio data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialPortfolio();
  }, []);

  const totals = calculatePortfolioTotals(stocks);
  const sectorSummaries = calculateSectorSummaries(stocks, SECTORS);

  return (
    <div className="min-h-screen bg-gray-50">
      <PortfolioHeader
        lastUpdated={lastUpdated}
        onRefresh={() => loadPortfolio(true)}
        isRefreshing={refreshing}
      />

      <main className="px-6 py-6">
        {loading && (
          <p className="py-12 text-center text-sm text-gray-500">
            Loading portfolio...
          </p>
        )}

        {!loading && error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => loadPortfolio(false)}
              className="mt-2 text-sm font-medium text-red-700 underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && stocks.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            No holdings in your portfolio yet.
          </p>
        )}

        {!loading && !error && stocks.length > 0 && (
          <>
            <PortfolioSummaryCards totals={totals} />
            <SectorSummaryTable sectors={sectorSummaries} />
            <StockHoldingsTable
              stocks={stocks}
              sectors={SECTORS}
              onSelectStock={setSelectedStock}
            />
          </>
        )}
      </main>

      <StockDetailPanel
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
      />
    </div>
  );
}
