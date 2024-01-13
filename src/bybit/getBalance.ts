import { client } from "./openTrade";

export async function getBalance() {
  const assets = await client.getAllCoinsBalance({
    accountType: "CONTRACT",
    coin: "USDT",
  });
  console.log(assets,"assets");
  return parseFloat(assets.result.balance[0].walletBalance);
}
