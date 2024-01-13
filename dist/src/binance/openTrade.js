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
exports.openTrade = void 0;
const generateSignature_1 = require("./generateSignature");
const const_1 = require("./const");
const getPositions_1 = require("./getPositions");
//[
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "0.004",
//     entryPrice: "43842.1",
//     breakEvenPrice: "43864.02105",
//     markPrice: "43842.10000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "39565.47294177",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.73955580",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "175.36840000",
//     isolatedWallet: "17.73955580",
//     updateTime: 1704580165880,
//     isolated: true,
//     adlQuantile: 0
//   }
// ]
// [
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "0.004",
//     entryPrice: "43842.1",
//     breakEvenPrice: "43864.02105",
//     markPrice: "43842.10000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "39565.47294177",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.73955580",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "175.36840000",
//     isolatedWallet: "17.73955580",
//     updateTime: 1704580165880,
//     isolated: true,
//     adlQuantile: 0
//   }
//short
// [
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "-0.004",
//     entryPrice: "43800.0",
//     breakEvenPrice: "43778.1",
//     markPrice: "43800.00000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "47966.23505976",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.43240000",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "-175.20000000",
//     isolatedWallet: "17.43240000",
//     updateTime: 1704580283217,
//     isolated: true,
//     adlQuantile: 0
//   }
// ]
// [
//   {
//     symbol: "BTCUSDT",
//     positionAmt: "-0.004",
//     entryPrice: "43800.0",
//     breakEvenPrice: "43778.1",
//     markPrice: "43800.00000000",
//     unRealizedProfit: "0.00000000",
//     liquidationPrice: "47966.23505976",
//     leverage: "10",
//     maxNotionalValue: "150000000",
//     marginType: "isolated",
//     isolatedMargin: "17.43240000",
//     isAutoAddMargin: "false",
//     positionSide: "BOTH",
//     notional: "-175.20000000",
//     isolatedWallet: "17.43240000",
//     updateTime: 1704580283217,
//     isolated: true,
//     adlQuantile: 0
//   }
// ]
function openTrade() {
    return __awaiter(this, void 0, void 0, function* () {
        // const btcPrice = await getCurrenctBitcoinPrice();
        // const balance = await getAccountBalance();
        yield (0, getPositions_1.getPositions)(100);
        const btcPrice = 43839.74303901;
        const quantity = String(1 / btcPrice);
        const queryParams = `symbol=BTCUSDT&side=BUY&type=MARKET&quantity=${quantity}&timestamp=${new Date().getTime()}`;
        const signature = (0, generateSignature_1.generateSignature)(queryParams);
        try {
            const testRes = yield fetch(`${const_1.URLV1}/order?${queryParams}&signature=${signature}`, {
                headers: const_1.headers,
                method: "POST",
            });
            if (testRes.ok) {
                const data = yield testRes.json();
                console.log(data);
            }
            else {
                console.log(testRes);
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.openTrade = openTrade;
