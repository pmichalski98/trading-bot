import { trade } from "./trade";
import { calculateQuantity } from "./calculateQuantity";
import { getBalance } from "./getBalance";
import { getPosition } from "./getPosition";
import { RestClientV5 } from "bybit-api";
import { customLogger } from "./customLogger";

const key = process.env.BYBIT_API_KEY;
const secret = process.env.BYBIT_API_SECRET;
console.log({ key, secret });
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
    const now = new Date().toDateString();
    // CHECKS IF I HAVE ANY POSITION IF 0 THAT MEANS NO
    if (openPosition.positionValue === "0") {
      const quantity = calculateQuantity(10, balance, btcPrice);
      const order = await trade(quantity, action);
      customLogger([
        "Should be 10% buy or sell, no positions",
        quantity,
        order,
      ]);
    } else {
      // CHECK THAT I HAVE ALREADY BOUGHT FOR 10% OF BALANCE
      if (balanceInTrade < 0.15) {
        // IF OPEN POSITION SIDE IS SAME AS ACTION THAT MEANS WE HAVE TO ADD TO POSITION
        if (openPosition.side === action) {
          const quantity = calculateQuantity(20, balance, btcPrice);
          const order = await trade(quantity, action);
          customLogger(["Should increase position by 20%", quantity, order]);
          // OPEN SIDE !== ACTION SO WE CLOSE THE POSITION AND OPEN for 10% ACCORDING TO SIGNAL
        } else {
          const order1 = await trade(openPosition.positionValue, action);
          const quantity = calculateQuantity(10, balance, btcPrice);
          const order2 = await trade(quantity, action);
          customLogger([
            "Should close current position fully and open new for 10%",
            order1,
            quantity,
            order2,
          ]);
        }
        // CHECKS THAT I HAVE BOUGHT TWICE, ONCE FOR 10% AND SECOND FOR 20%
      } else if (balanceInTrade > 0.16 && balanceInTrade < 0.5) {
        if (openPosition.side === action) {
          const quantity = calculateQuantity(50, balance, btcPrice);
          const order = await trade(quantity, action);
          customLogger(["Should increase position by 50%", quantity, order]);
        } else {
          const order1 = await trade(openPosition.positionValue, action);
          const quantity = calculateQuantity(10, balance, btcPrice);
          const order2 = await trade(quantity, action);
          customLogger([
            "Should close open position ktora juz raz byla dolozona and open new for 10%",
            order1,
            quantity,
            order2,
          ]);
        }
      } else if (balanceInTrade > 0.51 && openPosition.side !== action) {
        const order1 = await trade(openPosition.positionValue, action);
        const quantity = calculateQuantity(10, balance, btcPrice);
        const order2 = await trade(quantity, action);
        customLogger([
          "Should close 3 position and open new for 10%",
          order1,
          quantity,
          order2,
        ]);
      }
    }
    customLogger([balance, openPosition, balanceInTrade, btcPrice, now]);
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}
