# Technical Overview

## Architecture

The application is split into two parts:

-   **Frontend:** Next.js/React/TypeScript/Tailwind CSS for the
    dashboard UI.
-   **Backend:** Node.js API responsible for fetching and preparing
    stock data.

The frontend communicates with the deployed backend through
`NEXT_PUBLIC_API_URL`.

## Key Challenges & Solutions

### 1. Fetching live stock data

The dashboard needs current market values such as CMP and additional
financial metrics.

**Solution:** Yahoo Finance was used as the primary data source. The
backend service fetches the required stock information and returns a
consistent structure to the frontend.

### 2. Calculating portfolio values

Portfolio metrics depend on the relationship between purchase price,
quantity, and current market price.

**Solution:** Investment, present value, gain/loss, and portfolio
percentage are calculated from the holding data and current prices
rather than being hard-coded.

### 3. Handling multiple stock requests

The dashboard contains multiple holdings, so fetching each stock
sequentially would increase response time.

**Solution:** Stock requests are handled asynchronously, allowing
multiple independent requests to be processed concurrently.

### 4. Handling unavailable data

Financial data is not always available for every symbol or metric.

**Solution:** The backend and frontend handle missing values gracefully
instead of allowing one unavailable metric to break the entire
dashboard.

### 5. Avoiding unnecessary repeated requests

Rapid refreshes can result in repeated requests to the market-data
provider.

**Solution:** A short in-memory cache is used on the backend to reduce
repeated Yahoo Finance requests during a short period.

## Error Handling

The backend includes error handling for data-fetching failures, while
the frontend displays the available portfolio data without crashing when
an individual stock metric is unavailable.

## Design Decisions

The implementation intentionally keeps the backend lightweight and uses
simple Node.js services instead of introducing unnecessary dependencies.
The frontend focuses on the provided dashboard design while keeping the
data-fetching logic separate from presentation.
