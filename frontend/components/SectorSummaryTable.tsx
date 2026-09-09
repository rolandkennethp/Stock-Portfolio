import { SectorSummary } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";

interface SectorSummaryTableProps {
  sectors: SectorSummary[];
}

export default function SectorSummaryTable({
  sectors,
}: SectorSummaryTableProps) {
  return (
    <section className="mt-8">
      <div className="items-center justify-between mb-3 flex">
        <h2 className="text-sm font-semibold text-black">Sector summary</h2>
        <span className="text-xs text-gray-400">{sectors.length} sectors</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
              <th className="py-2 font-medium px-4">Sector</th>
              <th className="py-2 font-medium px-4">Investment</th>
              <th className="py-2 font-medium px-4">Current value</th>
              <th className="py-2 font-medium px-4">Gain/Loss</th>
              <th className="py-2 font-medium px-4">Return</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector) => {
              const hasHoldings = sector.investment > 0;
              const isGain = sector.gainLoss >= 0;
              return (
                <tr
                  key={sector.sector}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {sector.sector}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(sector.investment)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(sector.currentValue)}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      !hasHoldings
                        ? "text-gray-400"
                        : isGain
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {hasHoldings ? formatCurrency(sector.gainLoss) : "—"}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      !hasHoldings
                        ? "text-gray-400"
                        : isGain
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {sector.returnPercent === null
                      ? "—"
                      : formatPercent(sector.returnPercent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
