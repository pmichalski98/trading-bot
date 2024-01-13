"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateQuantity = void 0;
function calculateQuantity(balancePercent, balance, btcPrice) {
    return ((0.1 * balancePercent * balance) / btcPrice).toFixed(3);
}
exports.calculateQuantity = calculateQuantity;
