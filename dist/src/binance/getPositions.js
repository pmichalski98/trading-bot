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
exports.getPositions = void 0;
const generateSignature_1 = require("./generateSignature");
const const_1 = require("./const");
function getPositions(balance) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryParams = `symbol=BTCUSDT&timestamp=${new Date().getTime()}`;
        const signature = (0, generateSignature_1.generateSignature)(queryParams);
        try {
            const res = yield fetch(`${const_1.URLV2}/positionRisk?${queryParams}&signature=${signature}`, {
                headers: const_1.headers,
                method: "GET",
            });
            if (res.ok) {
                const openPosition = yield res.json();
                console.log(openPosition);
                // const percentInvolved =
                //   (parseInt(openPosition[1].isolatedMargin) / balance) * 100;
                // console.log(percentInvolved);
                console.log(openPosition);
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
exports.getPositions = getPositions;
