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
exports.getPosition = void 0;
const openTrade_1 = require("./openTrade");
function getPosition() {
    return __awaiter(this, void 0, void 0, function* () {
        const positions = yield openTrade_1.client.getPositionInfo({
            category: "linear",
            symbol: "BTCUSDT",
        });
        return positions.result.list[0];
    });
}
exports.getPosition = getPosition;
