import { Stock } from "./types";
import { MOCK_STOCKS } from "./mockData";

export async function fetchPortfolio(): Promise<Stock[]> {
  await simulateNetworkDelay();
  return MOCK_STOCKS;
}

function simulateNetworkDelay(ms: number = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
} //just for now to test the loading state
