import { trade } from "./trade";
import { getPosition } from "./getPosition";

export async function closeAllPositions() {
  const openPosition = await getPosition();
  const action = openPosition.side === "Buy" ? "Sell" : "Buy";
  return trade(openPosition.positionValue, action);
}
