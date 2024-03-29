import { trade } from "./trade";
import { calculateQuantity } from "./calculateQuantity";
import { getBalance } from "./getBalance";
import { getPosition } from "./getPosition";
import { RestClientV5 } from "bybit-api";

const key = process.env.BYBIT_API_KEY;
const secret = process.env.BYBIT_API_SECRET;
export const client = new RestClientV5({
  key,
  secret,
});

export async function openTrade(action: "Buy" | "Sell") {
  try {
    const balance = await getBalance();
    const openPosition = await getPosition();
    const balanceInTrade =
      parseFloat(openPosition.positionValue) / 10 / balance;
    const btcPrice = parseFloat(openPosition.markPrice);
    // CHECKS IF I HAVE ANY POSITION IF 0 THAT MEANS NO
    if (openPosition.positionValue === "0") {
      const quantity = calculateQuantity(10, balance, btcPrice);
      await trade(quantity, action);
    } else {
      // CHECK THAT I HAVE ALREADY BOUGHT FOR 10% OF BALANCE
      if (balanceInTrade < 0.15) {
        // IF OPEN POSITION SIDE IS SAME AS ACTION THAT MEANS WE HAVE TO ADD TO POSITION
        if (openPosition.side === action) {
          const quantity = calculateQuantity(20, balance, btcPrice);
          await trade(quantity, action);
          // OPEN SIDE !== ACTION SO WE CLOSE THE POSITION AND OPEN for 10% ACCORDING TO SIGNAL
        } else {
          await trade(openPosition.size, action);
          const quantity = calculateQuantity(10, balance, btcPrice);
          await trade(quantity, action);
        }
        // CHECKS THAT I HAVE BOUGHT TWICE, ONCE FOR 10% AND SECOND FOR 20%
      } else if (balanceInTrade > 0.16 && balanceInTrade < 0.5) {
        if (openPosition.side === action) {
          const quantity = calculateQuantity(50, balance, btcPrice);
          await trade(quantity, action);
        } else {
          await trade(openPosition.size, action);
          const quantity = calculateQuantity(10, balance, btcPrice);
          await trade(quantity, action);
        }
      } else if (balanceInTrade > 0.51 && openPosition.side !== action) {
        await trade(openPosition.size, action);
        const quantity = calculateQuantity(10, balance, btcPrice);
        await trade(quantity, action);
      }
    }
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}
