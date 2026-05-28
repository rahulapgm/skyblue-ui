# Skyblue UI

React, TypeScript, and Tailwind-ready UI components for GetOttam web experiences.

Skyblue UI is published as `@rahulapgm/skyblue-ui` and ships compiled ESM from `dist/` with generated TypeScript declarations. It is designed to work cleanly in Next.js apps, including App Router projects.

## Features

- React components written in TypeScript
- ESM package output for modern bundlers
- Generated `.d.ts` files for strict TypeScript projects
- Root exports and component subpath exports
- Tree-shakeable package structure
- Tailwind utility classes with CSS variable based theming
- Next.js compatible client component output

## Installation

```sh
npm install @rahulapgm/skyblue-ui
```

Install peer dependencies if your app does not already have them:

```sh
npm install react react-dom next framer-motion lucide-react
```

## Usage

Import from the package root for the standard component set:

```tsx
import { Button, Card, Input } from "@rahulapgm/skyblue-ui";

export function Example() {
  return (
    <Card>
      <Input label="Customer" placeholder="Enter customer name" />
      <Button>Save</Button>
    </Card>
  );
}
```

Use subpath imports for focused component entry points:

```tsx
import { Modal } from "@rahulapgm/skyblue-ui/modal";
import { ToastProvider, useToast } from "@rahulapgm/skyblue-ui/toast";
```

Do not use `@rahulapgm/skyblue-ui/src/*` in new application code. A compatibility export is kept for older consumers, but the supported public API is the package root and component subpaths.

## Tailwind Setup

Components use Tailwind utility classes and theme CSS variables. Your app must scan the compiled package output so Tailwind includes the classes used by the library.

Tailwind CSS v4:

```css
@import "tailwindcss";
@source "../node_modules/@rahulapgm/skyblue-ui/dist";
```

Tailwind CSS v3:

```js
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@rahulapgm/skyblue-ui/dist/**/*.{js,mjs}",
  ],
};
```

## Theme Tokens

Skyblue UI components rely on CSS custom properties such as `--color-brand-primary`, `--surface-card`, `--foreground`, and `--line-soft`. Define these tokens in your application theme, or reuse the preview theme in this repository as a starting point.

## Package Exports

The package publishes compiled files only:

```txt
dist/
  index.js
  index.d.ts
  button.js
  button.d.ts
  modal.js
  modal.d.ts
  ...
```

Supported import styles:

```tsx
import { Button } from "@rahulapgm/skyblue-ui";
import { Button } from "@rahulapgm/skyblue-ui/button";
import { cn } from "@rahulapgm/skyblue-ui/utils";
```

## Development

```sh
npm install
npm run dev
```

The preview app runs with Vite and aliases package imports back to local source files.

## Build

```sh
npm run typecheck
npm run build
npm run pack:check
```

`npm run build` compiles `src/` into `dist/` with `tsup`, generates declaration files, and adds `"use client"` to the compiled JavaScript output for Next.js compatibility.

## Publishing

Before publishing:

```sh
npm run typecheck
npm run build
npm run pack:check
```

Then publish a new version:

```sh
npm version patch
npm publish --access public
```

Use `minor` or `major` instead of `patch` when the release contains new features or breaking changes.

## Troubleshooting

If a consumer app reports `Cannot find module '@rahulapgm/skyblue-ui/src/badge'`, upgrade to the latest package version and replace source imports with public imports:

```tsx
import { Badge } from "@rahulapgm/skyblue-ui";
// or
import { Badge } from "@rahulapgm/skyblue-ui/badge";
```

If styles are missing, confirm Tailwind scans `node_modules/@rahulapgm/skyblue-ui/dist`.

## License

MIT
