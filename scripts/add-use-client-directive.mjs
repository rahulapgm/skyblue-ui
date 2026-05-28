import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const directive = "\"use client\";\n";

const files = await readdir(distDir);

await Promise.all(
  files
    .filter((file) => file.endsWith(".js"))
    .map(async (file) => {
      const filePath = join(distDir, file);
      const contents = await readFile(filePath, "utf8");

      if (contents.startsWith(directive)) {
        return;
      }

      await writeFile(filePath, `${directive}${contents}`);
    }),
);
