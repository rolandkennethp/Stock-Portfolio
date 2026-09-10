import { Stock } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";

interface StockDetailPanelProps {
  stock: Stock | null;
  onClose: () => void;
}

export default function StockDetailPanel({
  stock,
  onClose,
}: StockDetailPanelProps) {
  if (!stock) return null;

  const hasLiveData = stock.cmp !== null && stock.gainLoss !== null;
  const isGain = (stock.gainLoss ?? 0) >= 0;
  const returnPercent =
    stock.gainLoss !== null && stock.investment > 0
      ? (stock.gainLoss / stock.investment) * 100
      : null;

  const rows: { label: string; value: string }[] = [
    { label: "Purchase price", value: formatCurrency(stock.purchasePrice) },
    { label: "Quantity", value: String(stock.quantity) },
    { label: "Investment", value: formatCurrency(stock.investment) },
    { label: "Portfolio %", value: formatPercent(stock.portfolioPercent) },
    {
      label: "Current market price",
      value: stock.cmp !== null ? formatCurrency(stock.cmp) : "Unavailable",
    },
    {
      label: "Present value",
      value:
        stock.presentValue !== null
          ? formatCurrency(stock.presentValue)
          : "Unavailable",
    },
    {
      label: "P/E ratio",
      value: stock.peRatio === null ? "N/A" : String(stock.peRatio),
    },
    {
      label: "Latest earnings",
      value: stock.latestEarnings ?? "Data unavailable",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400">
              {stock.symbol} · {stock.exchange} · {stock.sector}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              {stock.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {hasLiveData ? (
          <div
            className={`mt-6 rounded-md p-4 ${isGain ? "bg-green-50" : "bg-red-50"}`}
          >
            <p className="text-xs text-gray-500">Unrealised gain/loss</p>
            <p
              className={`mt-1 text-xl font-semibold ${isGain ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(stock.gainLoss as number)}
              {returnPercent !== null && ` (${formatPercent(returnPercent)})`}
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-md bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              {stock.error ??
                "Live pricing is temporarily unavailable for this stock."}{" "}
              Purchase details below are still accurate.
            </p>
          </div>
        )}

        <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-3"
            >
              <dt className="text-sm text-gray-500">{row.label}</dt>
              <dd className="text-sm font-medium text-gray-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </>
  );
}
