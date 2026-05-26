import type { ReactNode } from "react";

import { cn } from "./utils";

type MetricTone = "default" | "brand" | "success" | "warning";

type MetricProps = {
  label: string;
  value: ReactNode;
  change?: string;
  icon?: ReactNode;
  tone?: MetricTone;
  className?: string;
};

const toneClasses: Record<MetricTone, string> = {
  default: "text-(--foreground)",
  brand: "text-(--color-brand-primary)",
  success: "text-(--color-status-success)",
  warning: "text-(--color-status-warning)",
};

export function Metric({ label, value, change, icon, tone = "default", className }: MetricProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-(--line-soft) bg-(--surface-card) p-5 shadow-(--shadow-sm)",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="type-caption text-(--ink-subtle)">{label}</p>
          <p className={cn("mt-2 text-3xl font-extrabold", toneClasses[tone])}>{value}</p>
          {change ? <p className="type-caption mt-2 text-(--ink-muted)">{change}</p> : null}
        </div>
        {icon ? <div className={cn("text-xl", toneClasses[tone])}>{icon}</div> : null}
      </div>
    </div>
  );
}
