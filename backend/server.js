require("dotenv").config();
const express = require("express");
const cors = require("cors");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// The Next.js frontend runs on a different port during development,
// so the browser treats requests to this API as cross-origin.
app.use(cors());
app.use(express.json());

app.use("/api", portfolioRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Fallback error handler: keeps stack traces / internal details out
// of any response that reaches this point.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`);
});
