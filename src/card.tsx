import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type CardTone = "surface" | "glass" | "muted" | "dark";
type CardPadding = "sm" | "md" | "lg" | "xl";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: CardTone;
  padding?: CardPadding;
};

const toneClasses: Record<CardTone, string> = {
  surface: "bg-(--surface-card) border border-(--line-soft) shadow-(--shadow-md)",
  glass: "surface-glass border border-(--line-soft) shadow-(--shadow-md)",
  muted: "bg-(--color-surface-muted) border border-(--line-soft) shadow-(--shadow-sm)",
  dark: "bg-(--color-bg-dark) border border-white/10 text-(--color-fg-inverse) shadow-(--shadow-lg)",
};

const paddingClasses: Record<CardPadding, string> = {
  sm: "gutter-card-sm",
  md: "gutter-card-md",
  lg: "gutter-card-lg",
  xl: "gutter-card-xl",
};

export function Card({ children, tone = "surface", padding = "md", className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn("rounded-xl", toneClasses[tone], paddingClasses[padding], className)}
    >
      {children}
    </div>
  );
}
