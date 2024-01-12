import { client } from "./openTrade";

export async function trade(quantity: string, side: "Buy" | "Sell") {
  return client.submitOrder({
    category: "linear",
    symbol: "BTCUSDT",
    qty: quantity,
    side,
    positionIdx: 0,
    orderType: "Market",
  });
}
