import { client } from "./openTrade";

export async function getPosition() {
  const positions = await client.getPositionInfo({
    category: "linear",
    symbol: "BTCUSDT",
  });
  return positions.result.list[0];
}
