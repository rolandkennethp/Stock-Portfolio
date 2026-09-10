// Static portfolio data — purchase price, quantity, and identifying
// info. This never changes at runtime; live market data (CMP, P/E,
// earnings) is layered on top of this by financialMetricsService.js.
//
// NOTE: some symbols below were given as numeric BSE scrip codes in the
// source data. Those have been resolved to their real NSE ticker
// symbols (verified against NSE/BSE listings) — see the chat response
// for the verification notes. One correction: "Tata Consumer" was
// given code 532540, which actually belongs to TCS. Mapped here by
// company name (TATACONSUM) instead.

const STATIC_PORTFOLIO = [
  // Financial Sector
  {
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    exchange: "NSE",
    sector: "Financial Sector",
    purchasePrice: 1490,
    quantity: 50,
  },
  {
    name: "Bajaj Finance",
    symbol: "BAJFINANCE",
    exchange: "NSE",
    sector: "Financial Sector",
    purchasePrice: 6466,
    quantity: 15,
  },
  {
    name: "ICICI Bank",
    symbol: "ICICIBANK",
    exchange: "NSE",
    sector: "Financial Sector",
    purchasePrice: 780,
    quantity: 84,
  },
  {
    name: "Bajaj Housing",
    symbol: "BAJAJHFL",
    exchange: "NSE",
    sector: "Financial Sector",
    purchasePrice: 130,
    quantity: 504,
  },
  {
    name: "Savani Financials",
    symbol: "SAVFI",
    exchange: "NSE",
    sector: "Financial Sector",
    purchasePrice: 24,
    quantity: 1080,
  },

  // Tech
  {
    name: "Affle India",
    symbol: "AFFLE",
    exchange: "NSE",
    sector: "Tech",
    purchasePrice: 1151,
    quantity: 50,
  },
  {
    name: "LTI Mindtree",
    symbol: "LTIM",
    exchange: "NSE",
    sector: "Tech",
    purchasePrice: 4775,
    quantity: 16,
  },
  {
    name: "KPIT Tech",
    symbol: "KPITTECH",
    exchange: "NSE",
    sector: "Tech",
    purchasePrice: 672,
    quantity: 61,
  },
  {
    name: "Tata Tech",
    symbol: "TATATECH",
    exchange: "NSE",
    sector: "Tech",
    purchasePrice: 1072,
    quantity: 63,
  },
  {
    name: "BLS E-Services",
    symbol: "BLSE",
    exchange: "NSE",
    sector: "Tech",
    purchasePrice: 232,
    quantity: 191,
  },
  {
    name: "Tanla",
    symbol: "TANLA",
    exchange: "NSE",
    sector: "Tech",
    purchasePrice: 1134,
    quantity: 45,
  },

  // Consumer
  {
    name: "DMart",
    symbol: "DMART",
    exchange: "NSE",
    sector: "Consumer",
    purchasePrice: 3777,
    quantity: 27,
  },
  {
    name: "Tata Consumer",
    symbol: "TATACONSUM",
    exchange: "NSE",
    sector: "Consumer",
    purchasePrice: 845,
    quantity: 90,
  },
  {
    name: "Pidilite",
    symbol: "PIDILITIND",
    exchange: "NSE",
    sector: "Consumer",
    purchasePrice: 2376,
    quantity: 36,
  },

  // Power
  {
    name: "Tata Power",
    symbol: "TATAPOWER",
    exchange: "NSE",
    sector: "Power",
    purchasePrice: 224,
    quantity: 225,
  },
  {
    name: "KPI Green",
    symbol: "KPIGREEN",
    exchange: "NSE",
    sector: "Power",
    purchasePrice: 875,
    quantity: 50,
  },
  {
    name: "Suzlon",
    symbol: "SUZLON",
    exchange: "NSE",
    sector: "Power",
    purchasePrice: 44,
    quantity: 450,
  },
  {
    name: "Gensol",
    symbol: "GENSOL",
    exchange: "NSE",
    sector: "Power",
    purchasePrice: 998,
    quantity: 45,
  },

  // Pipe Sector
  {
    name: "Hariom Pipes",
    symbol: "HARIOMPIPE",
    exchange: "NSE",
    sector: "Pipe Sector",
    purchasePrice: 580,
    quantity: 60,
  },
  {
    name: "Astral",
    symbol: "ASTRAL",
    exchange: "NSE",
    sector: "Pipe Sector",
    purchasePrice: 1517,
    quantity: 56,
  },
  {
    name: "Polycab",
    symbol: "POLYCAB",
    exchange: "NSE",
    sector: "Pipe Sector",
    purchasePrice: 2818,
    quantity: 28,
  },

  // Others
  {
    name: "Clean Science",
    symbol: "CLEAN",
    exchange: "NSE",
    sector: "Others",
    purchasePrice: 1610,
    quantity: 32,
  },
  {
    name: "Deepak Nitrite",
    symbol: "DEEPAKNTR",
    exchange: "NSE",
    sector: "Others",
    purchasePrice: 2248,
    quantity: 27,
  },
  {
    name: "Fine Organic",
    symbol: "FINEORG",
    exchange: "NSE",
    sector: "Others",
    purchasePrice: 4284,
    quantity: 16,
  },
  {
    name: "Gravita",
    symbol: "GRAVITA",
    exchange: "NSE",
    sector: "Others",
    purchasePrice: 2037,
    quantity: 8,
  },
  {
    name: "SBI Life",
    symbol: "SBILIFE",
    exchange: "NSE",
    sector: "Others",
    purchasePrice: 1197,
    quantity: 49,
  },
];

module.exports = STATIC_PORTFOLIO;
