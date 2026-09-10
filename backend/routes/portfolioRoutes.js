const express = require("express");
const router = express.Router();
const {
  getPortfolioWithMarketData,
} = require("../services/financialMetricsService");

router.get("/portfolio", async (req, res) => {
  try {
    const data = await getPortfolioWithMarketData();
    res.json({
      success: true,
      data,
      count: data.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    // Log full detail server-side; never leak stack traces or file
    // paths to the client.
    console.error("Failed to build portfolio response:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load portfolio data",
    });
  }
});

module.exports = router;
