import type { ReactNode } from "react";

import { Badge } from "./badge";
import { Card } from "./card";
import { cn } from "./utils";

type StatCardProps = {
  label: string;
  value: ReactNode;
  change?: string;
  tone?: "default" | "brand" | "success" | "warning";
  icon?: ReactNode;
  size?: "sm" | "md";
  className?: string;
};

const toneClasses = {
  default: "text-(--foreground)",
  brand: "text-(--color-brand-primary)",
  success: "text-(--color-status-success)",
  warning: "text-(--color-status-warning)",
} as const;

export function StatCard({
  label,
  value,
  change,
  tone = "default",
  icon,
  size = "md",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn("min-w-0 overflow-hidden", size === "sm" ? "min-h-42" : "min-h-49", className)}
      tone="surface"
      padding="md"
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="type-caption text-(--ink-subtle)">{label}</p>
          <p
            className={cn(
              "mt-2 whitespace-normal text-balance font-extrabold leading-[0.95]",
              size === "sm"
                ? "text-[1.5rem] sm:text-[1.75rem]"
                : "text-[1.625rem] sm:text-[2rem] lg:text-[2.25rem]",
              toneClasses[tone],
            )}
          >
            {value}
          </p>
        </div>
        {icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand-primary-light) text-(--color-brand-primary) sm:h-11 sm:w-11">
            {icon}
          </div>
        ) : null}
      </div>
      {change ? (
        <div className="mt-3 sm:mt-4">
          <Badge tone={tone === "success" ? "success" : tone === "warning" ? "warning" : "info"} size="sm">
            {change}
          </Badge>
        </div>
      ) : null}
    </Card>
  );
}
