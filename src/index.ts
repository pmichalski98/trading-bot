import express = require("express");
import bodyParser = require("body-parser");
import { openTrade } from "./bybit/openTrade";
import { closeAllPositions } from "./bybit/closeAllPositions";
import { readFileSync, writeFileSync } from "fs";
const app = express();
const port = 3555;
const FILE_PATH = "./src/switch.json";
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.post("/tradingSwitch", async (req, res) => {
  const { trade }: { trade: boolean } = JSON.parse(
    readFileSync(FILE_PATH, "utf-8"),
  );
  const data = { trade: !trade };
  writeFileSync(FILE_PATH, JSON.stringify(data));
  res.json({ msg: `Trading is ${data.trade ? "turned on" : "turned off"}` });
});

app.post("/closeAll", async (req, res) => {
  const response = await closeAllPositions();
  res.json({ msg: response.retMsg });
});

app.post("/tradingView", async (req, res) => {
  const { trade } = JSON.parse(readFileSync(FILE_PATH, "utf-8"));
  if (trade) {
    const { action } = req.body;
    await openTrade(action);
    res.sendStatus(200);
  }
  res.json({ msg: "Trading is turned off" });
});

app.listen(port || 3000, () => console.log(`Listening on ${port}`));
