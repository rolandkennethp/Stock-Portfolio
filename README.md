# Stock Portfolio Dashboard

A responsive stock portfolio dashboard built with Next.js, React,
TypeScript, Tailwind CSS, and a Node.js backend.

## Features

- Displays portfolio holdings with investment, present value,
  gain/loss, and portfolio percentage.
- Fetches live stock market data from Yahoo Finance.
- Shows CMP, P/E ratio, EPS, and latest earnings where available.
- Groups holdings by sector with sector totals.
- Responsive layout for desktop and smaller screens.
- Backend API is deployed on Render.

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- JavaScript

## Running Locally

### 1. Backend

```bash
cd backend
npm install
npm start
```

### 2. Frontend

In a separate terminal:

```bash
npm install
npm run dev
```

Configure the frontend API URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

If using the deployed backend instead:

```env
NEXT_PUBLIC_API_URL=https://stock-portfolio-8jst.onrender.com
```

Then open the local Next.js development URL shown in the terminal.

## Deployment

The backend is deployed at:

`https://stock-portfolio-8jst.onrender.com`

The frontend uses `NEXT_PUBLIC_API_URL` to determine which backend API
to call.

## Notes

Yahoo Finance is used as the market-data source. Market data can change
during trading hours, and availability of some metrics may vary by
stock.
