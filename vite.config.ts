import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/` : "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "preview-dist",
  },
  resolve: {
    alias: [
      { find: "next/link", replacement: "/preview/src/next-link-shim.tsx" },
      { find: "@rahulapgm/skyblue-ui/utils", replacement: "/src/utils.ts" },
      { find: /^@rahulapgm\/skyblue-ui\/(.+)$/, replacement: "/src/$1.tsx" },
      { find: /^@rahulapgm\/skyblue-ui$/, replacement: "/src/index.ts" },
    ],
  },
});
