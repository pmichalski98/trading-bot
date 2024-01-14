"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const openTrade_1 = require("./bybit/openTrade");
const closeAllPositions_1 = require("./bybit/closeAllPositions");
const fs_1 = require("fs");
const app = express();
const port = 3555;
const FILE_PATH = "./src/switch.json";
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.post("/tradingSwitch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trade } = JSON.parse((0, fs_1.readFileSync)(FILE_PATH, "utf-8"));
    const data = { trade: !trade };
    (0, fs_1.writeFileSync)(FILE_PATH, JSON.stringify(data));
    res.json({ msg: `Trading is ${data.trade ? "turned on" : "turned off"}` });
}));
app.post("/closeAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, closeAllPositions_1.closeAllPositions)();
    res.json({ msg: response.retMsg });
}));
app.post("/tradingView", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trade } = JSON.parse((0, fs_1.readFileSync)(FILE_PATH, "utf-8"));
    if (trade) {
        const { action } = req.body;
        yield (0, openTrade_1.openTrade)(action);
        res.sendStatus(200);
    }
    res.json({ msg: "Trading is turned off" });
}));
app.listen(port || 3000, () => console.log(`Listening on ${port}`));
