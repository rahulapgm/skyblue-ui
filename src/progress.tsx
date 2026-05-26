import { cn } from "./utils";

type ProgressTone = "brand" | "success" | "warning" | "error";
type ProgressSize = "sm" | "md" | "lg";

type ProgressProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: ProgressTone;
  size?: ProgressSize;
  className?: string;
};

const toneClasses: Record<ProgressTone, string> = {
  brand: "bg-(--color-brand-primary)",
  success: "bg-(--color-status-success)",
  warning: "bg-(--color-status-warning)",
  error: "bg-(--color-status-error)",
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

export function Progress({
  value,
  max = 100,
  label,
  showValue = true,
  tone = "brand",
  size = "md",
  className,
}: ProgressProps) {
  const safeMax = Math.max(max, 1);
  const clampedValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((clampedValue / safeMax) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      {label || showValue ? (
        <div className="flex items-center justify-between gap-3">
          {label ? <p className="type-caption text-(--foreground)">{label}</p> : <span />}
          {showValue ? <span className="type-caption text-(--ink-subtle)">{percentage}%</span> : null}
        </div>
      ) : null}
      <div
        className={cn("overflow-hidden rounded-full bg-(--color-surface-muted)", sizeClasses[size])}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clampedValue}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300 ease-out", toneClasses[tone])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
