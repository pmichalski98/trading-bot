import crypto = require("crypto");

const secretKey = process.env.BINANCE_API_SECRET!;
export function generateSignature(queryParam: string) {
  return crypto
    .createHmac("SHA256", secretKey)
    .update(queryParam)
    .digest("hex");
}
