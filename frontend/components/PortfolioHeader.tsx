interface PortfolioHeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function PortfolioHeader({
  lastUpdated,
  onRefresh,
  isRefreshing,
}: PortfolioHeaderProps) {
  return (
    <header className="border-gray-200 bg-white px-6 flex items-center top-0 sticky justify-between border-b py-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Portfolio Tracker
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {lastUpdated && (
          <span className="text-gray-500 sm:inline hidden text-sm ">
            Updated{" "}
            {lastUpdated.toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        )}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {isRefreshing ? "Updating..." : "Update prices"}
        </button>
      </div>
    </header>
  );
}
