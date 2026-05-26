import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type BadgeTone = "brand" | "neutral" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
  size?: BadgeSize;
};

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-(--color-brand-primary-light) text-(--color-brand-primary)",
  neutral: "bg-(--surface-chip) text-(--ink-muted)",
  success: "bg-(--color-status-success-light) text-(--color-status-success)",
  warning: "bg-(--color-status-warning-light) text-(--color-status-warning)",
  error: "bg-(--color-status-error-light) text-(--color-status-error)",
  info: "bg-(--color-status-info-light) text-(--color-status-info)",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2.5 py-1 type-caption",
  md: "px-3 py-1.5 type-caption",
};

export function Badge({ children, tone = "neutral", size = "md", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center rounded-full font-extrabold",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
