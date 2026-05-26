import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/` : "/",
  plugins: [react()],
  build: {
    outDir: "preview-dist",
  },
  resolve: {
    alias: [
      { find: "@rahulapgm/skyblue-ui/tabs", replacement: "/src/tabs.tsx" },
      { find: "@rahulapgm/skyblue-ui/toast", replacement: "/src/toast.tsx" },
      { find: "@rahulapgm/skyblue-ui/button", replacement: "/src/button.tsx" },
      { find: "@rahulapgm/skyblue-ui/utils", replacement: "/src/utils.ts" },
      { find: /^@rahulapgm\/skyblue-ui$/, replacement: "/src/index.ts" },
    ],
  },
});
