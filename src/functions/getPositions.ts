import { generateSignature } from "./generateSignature";
import { headers, URLV2 } from "./const";

export async function getPositions(balance: number) {
  const queryParams = `symbol=BTCUSDT&timestamp=${new Date().getTime()}`;
  const signature = generateSignature(queryParams);
  try {
    const res = await fetch(
      `${URLV2}/positionRisk?${queryParams}&signature=${signature}`,
      {
        headers,
        method: "GET",
      },
    );
    if (res.ok) {
      const openPosition: OpenPosition[] = await res.json();
      console.log(openPosition);
      // const percentInvolved =
      //   (parseInt(openPosition[1].isolatedMargin) / balance) * 100;
      // console.log(percentInvolved);
      console.log(openPosition);
    } else {
      // temp for dev
      console.log(res);
    }
  } catch (e) {
    // handle errors
    console.log(e);
  }
}
interface OpenPosition {
  positionAmt: string;
  unRealizedProfit: string;
  leverage: string;
  isolatedMargin: string;
  positionSide: string;
}
