import { client } from "./openTrade";

export async function getBalance() {
  const assets = await client.getAllCoinsBalance({
    accountType: "CONTRACT",
    coin: "USDT",
  });
  return parseFloat(assets.result.balance[0].walletBalance);
}
