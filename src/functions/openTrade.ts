import { getCurrenctBitcoinPrice } from "./getCurrenctBitcoinPrice";
import { generateSignature } from "./generateSignature";
import { headers, URLV1, URLV2 } from "./const";
import { getAccountBalance } from "./getAccountBalance";
import { getPositions } from "./getPositions";

//[
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "0.004",
//     entryPrice: "43842.1",
//     breakEvenPrice: "43864.02105",
//     markPrice: "43842.10000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "39565.47294177",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.73955580",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "175.36840000",
//     isolatedWallet: "17.73955580",
//     updateTime: 1704580165880,
//     isolated: true,
//     adlQuantile: 0
//   }
// ]
// [
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "0.004",
//     entryPrice: "43842.1",
//     breakEvenPrice: "43864.02105",
//     markPrice: "43842.10000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "39565.47294177",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.73955580",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "175.36840000",
//     isolatedWallet: "17.73955580",
//     updateTime: 1704580165880,
//     isolated: true,
//     adlQuantile: 0
//   }

//short
// [
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "-0.004",
//     entryPrice: "43800.0",
//     breakEvenPrice: "43778.1",
//     markPrice: "43800.00000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "47966.23505976",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.43240000",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "-175.20000000",
//     isolatedWallet: "17.43240000",
//     updateTime: 1704580283217,
//     isolated: true,
//     adlQuantile: 0
//   }
// ]
// [
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "-0.004",
//     entryPrice: "43800.0",
//     breakEvenPrice: "43778.1",
//     markPrice: "43800.00000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "47966.23505976",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.43240000",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "-175.20000000",
//     isolatedWallet: "17.43240000",
//     updateTime: 1704580283217,
//     isolated: true,
//     adlQuantile: 0
//   }
// ]

export async function openTrade() {
  // const btcPrice = await getCurrenctBitcoinPrice();
  // const balance = await getAccountBalance();
  await getPositions(100);
  const btcPrice = 43839.74303901;
  const quantity = String(1 / btcPrice!);
  const queryParams = `symbol=BTCUSDT&side=BUY&type=MARKET&quantity=${quantity}&timestamp=${new Date().getTime()}`;
  const signature = generateSignature(queryParams);
  try {
    const testRes = await fetch(
      `${URLV1}/order?${queryParams}&signature=${signature}`,
      {
        headers,
        method: "POST",
      },
    );
    if (testRes.ok) {
      const data = await testRes.json();
      console.log(data);
    } else {
      console.log(testRes);
    }
  } catch (e) {
    console.log(e);
  }
}
