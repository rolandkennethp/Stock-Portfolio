// Pure math — no network calls, no dependency on where the numbers
// came from. Kept separate from the services so it's trivially
// testable and easy to point to in an interview as "this is where
// the formulas live."

function calculateInvestment(purchasePrice, quantity) {
  return purchasePrice * quantity;
}

function calculatePresentValue(cmp, quantity) {
  if (cmp === null || cmp === undefined) return null;
  return cmp * quantity;
}

function calculateGainLoss(presentValue, investment) {
  if (presentValue === null) return null;
  return presentValue - investment;
}

function calculatePortfolioPercent(investment, totalInvestment) {
  if (totalInvestment === 0) return 0;
  return (investment / totalInvestment) * 100;
}

module.exports = {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
  calculatePortfolioPercent,
};
