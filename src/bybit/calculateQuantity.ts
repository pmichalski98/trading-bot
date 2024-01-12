export function calculateQuantity(
  balancePercent: number,
  balance: number,
  btcPrice: number,
) {
  return ((0.1 * balancePercent * balance) / btcPrice).toFixed(3);
}
