"use client";

import { useMemo, useState } from "react";
import { StockWithMetrics } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";

interface StockHoldingsTableProps {
  stocks: StockWithMetrics[];
  sectors: string[];
  onSelectStock: (stock: StockWithMetrics) => void;
}

type SortKey =
  | "name"
  | "sector"
  | "buyPrice"
  | "quantity"
  | "investment"
  | "cmp"
  | "presentValue"
  | "gainLoss"
  | "returnPercent";

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Stock" },
  { key: "sector", label: "Sector" },
  { key: "buyPrice", label: "Buy Price" },
  { key: "quantity", label: "Quantity" },
  { key: "investment", label: "Investment" },
  { key: "cmp", label: "CMP" },
  { key: "presentValue", label: "Present Value" },
  { key: "gainLoss", label: "Gain/Loss" },
  { key: "returnPercent", label: "Return" },
];

export default function StockHoldingsTable({
  stocks,
  sectors,
  onSelectStock,
}: StockHoldingsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All sectors");
  const [sortColumn, setSortColumn] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function handleSort(column: SortKey) {
    if (column === sortColumn) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const visibleStocks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = stocks.filter((stock) => {
      const matchesSearch =
        query === "" ||
        stock.name.toLowerCase().includes(query) ||
        stock.symbol.toLowerCase().includes(query);
      const matchesSector =
        sectorFilter === "All sectors" || stock.sector === sectorFilter;
      return matchesSearch && matchesSector;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      const aNum = aValue as number;
      const bNum = bValue as number;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    });

    return sorted;
  }, [stocks, searchQuery, sectorFilter, sortColumn, sortDirection]);

  return (
    <section className="mt-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-black">Stock holdings</h2>
          <p className="text-xs text-gray-400">
            {visibleStocks.length} of {stocks.length} holdings
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search stock or symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 rounded-md border  focus:outline-none"
          />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className=" py-1.5 text-sm focus:border-blue-500 rounded-md border border-gray-300 px-3  focus:outline-none"
          >
            <option>All sectors</option>
            {sectors.map((sector) => (
              <option key={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full whitespace-nowrap text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
              {SORTABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="cursor-pointer select-none px-4 py-2 font-medium hover:text-gray-700"
                >
                  {col.label}{" "}
                  <span
                    className={
                      sortColumn === col.key ? "text-gray-700" : "text-gray-300"
                    }
                  >
                    {sortColumn === col.key
                      ? sortDirection === "asc"
                        ? "↑"
                        : "↓"
                      : "↑↓"}
                  </span>
                </th>
              ))}
              <th className="px-4 py-2 font-medium">P/E</th>
              <th className="px-4 py-2 font-medium">EPS / Latest Earnings</th>
              <th className="px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleStocks.map((stock) => {
              const isGain = stock.gainLoss >= 0;
              return (
                <tr
                  key={stock.symbol}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelectStock(stock)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {stock.name}
                    </button>
                    <p className="text-xs text-gray-400">{stock.symbol}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{stock.sector}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(stock.buyPrice)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{stock.quantity}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(stock.investment)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(stock.cmp)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(stock.presentValue)}
                  </td>
                  <td
                    className={`px-4 py-3 ${isGain ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatCurrency(stock.gainLoss)}
                  </td>
                  <td
                    className={`px-4 py-3 ${isGain ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatPercent(stock.returnPercent)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {stock.peRatio === null ? (
                      <span className="text-gray-400">N/A</span>
                    ) : (
                      stock.peRatio
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {stock.eps === null ? (
                      <>
                        <p className="text-gray-400">EPS unavailable</p>
                        <p className="text-xs text-gray-400">
                          Data unavailable
                        </p>
                      </>
                    ) : (
                      <>
                        <p>EPS ₹{stock.eps}</p>
                        <p className="text-xs text-gray-400">
                          {stock.latestEarningsQuarter} · ₹
                          {stock.latestEarningsCr?.toLocaleString("en-IN")} Cr
                        </p>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelectStock(stock)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visibleStocks.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            No stocks match your search or filter.
          </p>
        )}
      </div>
    </section>
  );
}
