import { LoaderCircle } from "lucide-react";

import { cn } from "./utils";

type LoaderSize = "sm" | "md" | "lg";
type LoaderTone = "brand" | "neutral" | "inverse";

type LoaderProps = {
  label?: string | null;
  size?: LoaderSize;
  tone?: LoaderTone;
  className?: string;
};

const sizeClasses: Record<LoaderSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const toneClasses: Record<LoaderTone, string> = {
  brand: "text-(--color-brand-primary)",
  neutral: "text-(--ink-muted)",
  inverse: "text-white",
};

export function Loader({ label = "Loading", size = "md", tone = "brand", className }: LoaderProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} role="status" aria-live="polite">
      <LoaderCircle className={cn("animate-spin", sizeClasses[size], toneClasses[tone])} />
      {label ? <span className="type-caption text-(--ink-muted)">{label}</span> : null}
    </span>
  );
}

type PageLoaderOverlayProps = {
  label?: string;
  description?: string;
  className?: string;
};

type BlockLoaderOverlayProps = {
  label?: string;
  description?: string;
  className?: string;
};

export function PageLoaderOverlay({ label = "Loading", description, className }: PageLoaderOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center bg-white/70 backdrop-blur-sm",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex min-w-60 max-w-sm flex-col items-center gap-3 rounded-lg border border-(--line-soft) bg-(--surface-card) px-6 py-5 text-center shadow-(--shadow-lg)">
        <LoaderCircle className={cn("animate-spin", sizeClasses.lg, toneClasses.brand)} />
        <p className="type-title text-(--foreground)">{label}</p>
        {description ? <p className="type-body text-(--ink-muted)">{description}</p> : null}
      </div>
    </div>
  );
}

export function BlockLoaderOverlay({
  label = "Loading",
  description,
  className,
}: BlockLoaderOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-white/72 p-4 backdrop-blur-sm",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex min-w-56 max-w-xs flex-col items-center gap-3 rounded-2xl border border-(--line-soft) bg-(--surface-card) px-5 py-4 text-center shadow-(--shadow-md)">
        <LoaderCircle className={cn("animate-spin", sizeClasses.md, toneClasses.brand)} />
        <p className="type-title text-(--foreground)">{label}</p>
        {description ? <p className="type-body text-(--ink-muted)">{description}</p> : null}
      </div>
    </div>
  );
}
