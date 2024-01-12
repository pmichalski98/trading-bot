const apiKey = process.env.BINANCE_API_KEY!;

export const headers = {
  "X-MBX-APIKEY": apiKey,
};
export const URLV2 = "https://binance.com/fapi/v2";
export const URLV1 = "https://binance.com/fapi/v1";
