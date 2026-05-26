"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "./utils";

type SwatchProps = {
  name: string;
  value: string;
  description?: string;
  shape?: "square" | "circle";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const previewSizeClasses = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
} as const;

export function Swatch({
  name,
  value,
  description,
  shape = "square",
  size = "md",
  className,
}: SwatchProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div
      className={cn(
        "surface-glass flex items-center gap-4 rounded-3xl border border-(--line-soft) p-4 shadow-(--shadow-sm)",
        className,
      )}
    >
      <div
        className={cn(
          "shrink-0 border border-(--line-soft) shadow-(--shadow-sm)",
          previewSizeClasses[size],
          shape === "circle" ? "rounded-full" : "rounded-2xl",
        )}
        style={{ backgroundColor: value }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="type-title">{name}</p>
        <p className="type-caption mt-1 text-(--ink-subtle)">{value}</p>
        {description ? <p className="type-body mt-2 text-(--ink-muted)">{description}</p> : null}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-(--line-soft) bg-(--surface-card) text-(--ink-muted) transition-colors hover:bg-(--color-surface-hover)"
        aria-label={`Copy ${name} color value`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
