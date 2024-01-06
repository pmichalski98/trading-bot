import { generateSignature } from "./generateSignature";
import { headers, URLV2 } from "./const";

interface Balance {
  asset: string;
  balance: string;
}
export async function getAccountBalance() {
  const queryParams = `timestamp=${new Date().getTime()}`;
  const signature = generateSignature(queryParams);
  try {
    const res = await fetch(
      `${URLV2}/balance?${queryParams}&signature=${signature}`,
      {
        headers,
        method: "GET",
      },
    );
    if (res.ok) {
      const data: Balance[] = await res.json();
      const [usdt] = data.filter((entry) => entry.asset === "USDT");
      return parseFloat(usdt.balance);
    } else {
      // handle edge cases
      console.log(res);
    }
  } catch (e) {
    // handle errors
    console.log(e);
  }
}
