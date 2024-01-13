"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLV1 = exports.URLV2 = exports.headers = void 0;
const apiKey = process.env.BINANCE_API_KEY;
exports.headers = {
    "X-MBX-APIKEY": apiKey,
};
exports.URLV2 = "https://binance.com/fapi/v2";
exports.URLV1 = "https://binance.com/fapi/v1";
