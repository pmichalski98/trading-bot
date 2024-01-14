import { appendFileSync } from "node:fs";

export function customLogger(data: unknown[]) {
  const FILE_PATH = "./src/logs.txt";
  data.map((entry, i) =>
    appendFileSync(
      FILE_PATH,
      JSON.stringify(`\n${entry}${i === data.length - 1 && "\n\n"}`),
    ),
  );
}
