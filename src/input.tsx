import type { InputHTMLAttributes } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
};

export function Input({
  label,
  helperText,
  errorText,
  leadingSlot,
  trailingSlot,
  className,
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(errorText);

  return (
    <div className="w-full">
      {label ? (
        <Label htmlFor={inputId} requiredMark={required} className="mb-2 block">
          {label}
        </Label>
      ) : null}
      <div
        className={cn(
          "flex min-h-12 items-center gap-3 rounded-2xl border bg-(--surface-card) px-4 shadow-(--shadow-sm) transition-colors",
          hasError
            ? "border-(--color-status-error)"
            : "border-(--line-soft) hover:border-(--color-line-strong)",
        )}
      >
        {leadingSlot}
        <input
          {...props}
          id={inputId}
          required={required}
          className={cn(
            "type-body min-h-12 w-full bg-transparent text-(--foreground) outline-none placeholder:text-(--ink-subtle)",
            className,
          )}
        />
        {trailingSlot}
      </div>
      {errorText ? (
        <p className="type-caption mt-2 text-(--color-status-error)">{errorText}</p>
      ) : helperText ? (
        <p className="type-caption mt-2 text-(--ink-subtle)">{helperText}</p>
      ) : null}
    </div>
  );
}
