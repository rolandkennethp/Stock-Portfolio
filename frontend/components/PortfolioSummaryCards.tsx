import { PortfolioTotals } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";

interface PortfolioSummaryCardsProps {
  totals: PortfolioTotals;
}

export default function PortfolioSummaryCards({
  totals,
}: PortfolioSummaryCardsProps) {
  const isGain = totals.totalGainLoss >= 0;

  const cards = [
    {
      label: "Total Investment",
      sub: "Cost basis",
      value: formatCurrency(totals.totalInvestment),
    },
    {
      label: "Current Value",
      sub: "Market value",
      value: formatCurrency(totals.currentValue),
    },
    {
      label: "Total Gain/Loss",
      sub: "Unrealised",
      value: formatCurrency(totals.totalGainLoss),
      colored: true,
    },
    {
      label: "Overall Return",
      sub: "Since purchase",
      value: formatPercent(totals.overallReturnPercent),
      colored: true,
    },
  ];

  return (
    <section>
      <h2 className="font-semibold text-gray-900 mb-3 text-sm ">
        Portfolio summary
      </h2>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 sm:grid-cols-2 ">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p
              className={`mt-1 text-2xl font-semibold ${
                card.colored
                  ? isGain
                    ? "text-green-500"
                    : "text-red-700"
                  : "text-black"
              }`}
            >
              {card.value}
            </p>
            <p className="  text-gray-400mt-1 text-xs">{card.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
