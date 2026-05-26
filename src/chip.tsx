"use client";

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";

import { cn } from "./utils";

type ChipVariant = "brand" | "neutral" | "success" | "warning" | "error" | "info";
type ChipSize = "sm" | "md" | "lg";

type SharedChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onRemove?: () => void;
  className?: string;
};

type ChipProps =
  | (SharedChipProps & ButtonHTMLAttributes<HTMLButtonElement> & { onClick: () => void })
  | (SharedChipProps & HTMLAttributes<HTMLSpanElement> & { onClick?: undefined });

const chipBaseClasses = "inline-flex items-center gap-2 rounded-full border font-bold transition-colors";

const chipVariantClasses: Record<ChipVariant, string> = {
  brand:
    "border-(--color-brand-primary-light) bg-(--color-brand-primary-light) text-(--color-brand-primary)",
  neutral: "border-(--line-soft) bg-(--surface-card) text-(--foreground)",
  success:
    "border-(--color-status-success-light) bg-(--color-status-success-light) text-(--color-status-success)",
  warning:
    "border-(--color-status-warning-light) bg-(--color-status-warning-light) text-(--color-status-warning)",
  error: "border-(--color-status-error-light) bg-(--color-status-error-light) text-(--color-status-error)",
  info: "border-(--color-status-info-light) bg-(--color-status-info-light) text-(--color-status-info)",
};

const chipSizeClasses: Record<ChipSize, string> = {
  sm: "min-h-9 px-3 type-caption",
  md: "min-h-10 px-4 type-caption",
  lg: "min-h-11 px-5 type-body",
};

export function Chip(props: ChipProps) {
  const {
    children,
    variant = "neutral",
    size = "md",
    leadingIcon,
    trailingIcon,
    onRemove,
    className,
    ...rest
  } = props;

  const content = (
    <>
      {leadingIcon ? <span className="flex shrink-0 items-center">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="flex shrink-0 items-center">{trailingIcon}</span> : null}
      {onRemove ? (
        <button
          type="button"
          aria-label="Remove chip"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </>
  );

  const classes = cn(chipBaseClasses, chipVariantClasses[variant], chipSizeClasses[size], className);

  if ("onClick" in props && props.onClick) {
    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
        {content}
      </button>
    );
  }

  const spanProps = rest as HTMLAttributes<HTMLSpanElement>;

  return (
    <span {...spanProps} className={classes}>
      {content}
    </span>
  );
}
