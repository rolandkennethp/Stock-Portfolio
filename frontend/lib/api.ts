import { Stock, PortfolioApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchPortfolio(): Promise<Stock[]> {
  const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load portfolio");
  }

  const json: PortfolioApiResponse = await res.json();

  if (!json.success) {
    throw new Error("Backend reported a failure loading the portfolio");
  }

  return json.data;
}
