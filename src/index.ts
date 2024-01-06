import express = require("express");
import bodyParser = require("body-parser");
import { generateSignature } from "./functions/generateSignature";
import { headers } from "./functions/const";
import { getPositions } from "./functions/getPositions";
import { getAccountBalance } from "./functions/getAccountBalance";
import { getCurrenctBitcoinPrice } from "./functions/getCurrenctBitcoinPrice";
import { openTrade } from "./functions/openTrade";

const app = express();
const port = 3555;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
async function test() {
  const queryParams = `symbol=BTCUSDT&side=BUY&timestamp=${new Date().getTime()}`;
  const signature = generateSignature(queryParams);
  try {
    const testRes = await fetch(
      `${URL}/balance?${queryParams}&signature=${signature}`,
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
app.post("/tradingView", async (req, res) => {
  await openTrade();
  // if (balance) {
  //   await getPositions(balance);
  // }
  // const action = req.body;
  // console.log(action);
  res.sendStatus(200);
});

app.listen(port || 3000, () => console.log(`Listening on ${port}`));
