import { headers, URLV1 } from "./const";

interface BTCPrice {
  markPrice: string;
}
export async function getCurrenctBitcoinPrice() {
  const queryParams = `symbol=BTCUSDT&timestamp=${new Date().getTime()}`;
  try {
    const res = await fetch(`${URLV1}/premiumIndex?${queryParams}`, {
      headers,
      method: "GET",
    });
    if (res.ok) {
      const btcPrice: BTCPrice = await res.json();
      return parseFloat(btcPrice.markPrice);
    } else {
      // temp for dev
      console.log(res);
    }
  } catch (e) {
    // handle errors
    console.log(e);
  }
}
