"use client";

import { useMemo, useState } from "react";
import { Stock } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";

interface StockHoldingsTableProps {
  stocks: Stock[];
  sectors: string[];
  onSelectStock: (stock: Stock) => void;
}

// A stock with its return % worked out for display/sorting. The
// backend doesn't send this (it's not one of the required fields) —
// it's a simple derived view of two numbers we already have.
interface StockRow extends Stock {
  returnPercent: number | null;
}

type SortKey =
  | "name"
  | "sector"
  | "exchange"
  | "purchasePrice"
  | "quantity"
  | "investment"
  | "cmp"
  | "presentValue"
  | "gainLoss"
  | "returnPercent";

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Stock" },
  { key: "sector", label: "Sector" },
  { key: "exchange", label: "Exch." },
  { key: "purchasePrice", label: "Purchase Price" },
  { key: "quantity", label: "Quantity" },
  { key: "investment", label: "Investment" },
  { key: "cmp", label: "CMP" },
  { key: "presentValue", label: "Present Value" },
  { key: "gainLoss", label: "Gain/Loss" },
  { key: "returnPercent", label: "Return" },
];

// Sorts null values (from stocks whose live data failed to load) to
// the end regardless of sort direction, instead of throwing them at
// the top or bottom inconsistently.
function compareValues(
  a: string | number | null,
  b: string | number | null,
  direction: "asc" | "desc",
) {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (typeof a === "string" && typeof b === "string") {
    return direction === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  }
  return direction === "asc"
    ? (a as number) - (b as number)
    : (b as number) - (a as number);
}

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
    const rows: StockRow[] = stocks.map((stock) => ({
      ...stock,
      returnPercent:
        stock.gainLoss === null || stock.investment === 0
          ? null
          : (stock.gainLoss / stock.investment) * 100,
    }));

    const query = searchQuery.trim().toLowerCase();
    const filtered = rows.filter((stock) => {
      const matchesSearch =
        query === "" ||
        stock.name.toLowerCase().includes(query) ||
        stock.symbol.toLowerCase().includes(query);
      const matchesSector =
        sectorFilter === "All sectors" || stock.sector === sectorFilter;
      return matchesSearch && matchesSector;
    });

    return [...filtered].sort((a, b) =>
      compareValues(a[sortColumn], b[sortColumn], sortDirection),
    );
  }, [stocks, searchQuery, sectorFilter, sortColumn, sortDirection]);

  return (
    <section className="mt-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Stock holdings
          </h2>
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
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
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
              <th className="px-4 py-2 font-medium">Latest Earnings</th>
              <th className="px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleStocks.map((stock) => {
              const isGain = (stock.gainLoss ?? 0) >= 0;
              const hasLiveData = stock.cmp !== null;

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
                    <p className="text-xs text-gray-400">
                      {stock.symbol} · {stock.exchange}
                      {stock.error && (
                        <span className="text-amber-600">
                          {" "}
                          · data unavailable
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{stock.sector}</td>
                  <td className="px-4 py-3 text-gray-700">{stock.exchange}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(stock.purchasePrice)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{stock.quantity}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(stock.investment)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {hasLiveData ? (
                      formatCurrency(stock.cmp as number)
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {stock.presentValue !== null ? (
                      formatCurrency(stock.presentValue)
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 ${stock.gainLoss === null ? "text-gray-400" : isGain ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock.gainLoss !== null
                      ? formatCurrency(stock.gainLoss)
                      : "—"}
                  </td>
                  <td
                    className={`px-4 py-3 ${stock.returnPercent === null ? "text-gray-400" : isGain ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock.returnPercent !== null
                      ? formatPercent(stock.returnPercent)
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {stock.peRatio === null ? (
                      <span className="text-gray-400">N/A</span>
                    ) : (
                      stock.peRatio
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {stock.latestEarnings === null ? (
                      <span className="text-gray-400">Data unavailable</span>
                    ) : (
                      stock.latestEarnings
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
