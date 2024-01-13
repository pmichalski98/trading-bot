"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const crypto = require("crypto");
const secretKey = process.env.BINANCE_API_SECRET;
function generateSignature(queryParam) {
    return crypto
        .createHmac("SHA256", secretKey)
        .update(queryParam)
        .digest("hex");
}
exports.generateSignature = generateSignature;
