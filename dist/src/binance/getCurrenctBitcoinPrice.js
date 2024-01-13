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
exports.getCurrenctBitcoinPrice = void 0;
const const_1 = require("./const");
function getCurrenctBitcoinPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryParams = `symbol=BTCUSDT&timestamp=${new Date().getTime()}`;
        try {
            const res = yield fetch(`${const_1.URLV1}/premiumIndex?${queryParams}`, {
                headers: const_1.headers,
                method: "GET",
            });
            if (res.ok) {
                const btcPrice = yield res.json();
                return parseFloat(btcPrice.markPrice);
            }
            else {
                // temp for dev
                console.log(res);
            }
        }
        catch (e) {
            // handle errors
            console.log(e);
        }
    });
}
exports.getCurrenctBitcoinPrice = getCurrenctBitcoinPrice;
