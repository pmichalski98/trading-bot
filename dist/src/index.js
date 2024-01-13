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
const IP = require("ip");
const app = express();
const port = 3555;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.post("/tradingView", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = req.body;
    console.log(action);
    yield (0, openTrade_1.openTrade)(action);
    res.sendStatus(200);
}));
app.listen(port || 3000, () => console.log(`Listening on ${port}`));
