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
exports.openTrade = exports.client = void 0;
const trade_1 = require("./trade");
const calculateQuantity_1 = require("./calculateQuantity");
const getBalance_1 = require("./getBalance");
const getPosition_1 = require("./getPosition");
const bybit_api_1 = require("bybit-api");
const key = process.env.BYBIT_API_KEY;
const secret = process.env.BYBIT_API_SECRET;
console.log({ key, secret });
exports.client = new bybit_api_1.RestClientV5({
    key,
    secret,
});
function openTrade(action) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const balance = yield (0, getBalance_1.getBalance)();
            const openPosition = yield (0, getPosition_1.getPosition)();
            const balanceInTrade = parseFloat(openPosition.positionValue) / 10 / balance;
            const btcPrice = parseFloat(openPosition.markPrice);
            console.log({ btcPrice });
            // CHECKS IF I HAVE ANY POSITION IF 0 THAT MEANS NO
            if (openPosition.positionValue === "0") {
                const quantity = (0, calculateQuantity_1.calculateQuantity)(10, balance, btcPrice);
                const order = yield (0, trade_1.trade)(quantity, action);
            }
            else {
                // CHECK THAT I HAVE ALREADY BOUGHT FOR 10% OF BALANCE
                if (balanceInTrade < 0.15) {
                    // IF OPEN POSITION SIDE IS SAME AS ACTION THAT MEANS WE HAVE TO ADD TO POSITION
                    if (openPosition.side === action) {
                        const quantity = (0, calculateQuantity_1.calculateQuantity)(20, balance, btcPrice);
                        yield (0, trade_1.trade)(quantity, action);
                        // OPEN SIDE !== ACTION SO WE CLOSE THE POSITION AND OPEN for 10% ACCORDING TO SIGNAL
                    }
                    else {
                        yield (0, trade_1.trade)(openPosition.positionValue, action);
                        const quantity = (0, calculateQuantity_1.calculateQuantity)(10, balance, btcPrice);
                        yield (0, trade_1.trade)(quantity, action);
                    }
                    // CHECKS THAT I HAVE BOUGHT TWICE, ONCE FOR 10% AND SECOND FOR 20%
                }
                else if (balanceInTrade > 0.16 && balanceInTrade < 0.5) {
                    if (openPosition.side === action) {
                        const quantity = (0, calculateQuantity_1.calculateQuantity)(50, balance, btcPrice);
                        yield (0, trade_1.trade)(quantity, action);
                    }
                    else {
                        yield (0, trade_1.trade)(openPosition.positionValue, action);
                        const quantity = (0, calculateQuantity_1.calculateQuantity)(10, balance, btcPrice);
                        yield (0, trade_1.trade)(quantity, action);
                    }
                }
                else if (balanceInTrade > 0.51 && openPosition.side !== action) {
                    yield (0, trade_1.trade)(openPosition.positionValue, action);
                    const quantity = (0, calculateQuantity_1.calculateQuantity)(10, balance, btcPrice);
                    yield (0, trade_1.trade)(quantity, action);
                }
            }
        }
        catch (e) {
            console.error(e);
            throw new Error("Something went wrong");
        }
    });
}
exports.openTrade = openTrade;
