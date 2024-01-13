import express = require("express");
import bodyParser = require("body-parser");
import { openTrade } from "./bybit/openTrade";
const IP = require("ip");
const app = express();
const port = 3555;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/tradingView", async (req, res) => {
  const {action} = req.body
  console.log(action);
  await openTrade(action)
  res.sendStatus(200);
});

app.listen(port || 3000, () => console.log(`Listening on ${port}`));
