import express = require("express");
import bodyParser = require("body-parser");

const app = express();
const port = 3555;
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;
const URL = "https://binance.com/fapi/v1";
const TESTURL = "https://testnet.binancefuture.com";

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
async function test() {
  const testRes = await fetch(`${URL}/time`);

  console.log(testRes);
  const data = await testRes.json();
  console.log({ data });
}
app.post("/tradingView", async (req, res) => {
  await test();
  // const action = req.body;
  // console.log(action);
  res.sendStatus(200);
});

app.listen(port || 3000, () => console.log(`Listening on ${port}`));
