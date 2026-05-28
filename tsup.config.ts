import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/*.tsx", "src/utils.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: true,
  sourcemap: true,
  treeshake: true,
  target: "es2022",
  outDir: "dist",
  external: ["react", "react-dom", "next", "framer-motion", "lucide-react"],
});
