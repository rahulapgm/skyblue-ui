import type { InputHTMLAttributes } from "react";
import { CalendarDays } from "lucide-react";

import { Label } from "./label";
import { cn } from "./utils";

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  helperText?: string;
  errorText?: string;
};

export function DatePicker({
  label,
  helperText,
  errorText,
  className,
  id,
  required,
  ...props
}: DatePickerProps) {
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
        <CalendarDays className="h-4 w-4 text-(--ink-subtle)" />
        <input
          {...props}
          id={inputId}
          type="date"
          required={required}
          className={cn(
            "type-body min-h-12 w-full bg-transparent text-(--foreground) outline-none",
            className,
          )}
        />
      </div>
      {errorText ? (
        <p className="type-caption mt-2 text-(--color-status-error)">{errorText}</p>
      ) : helperText ? (
        <p className="type-caption mt-2 text-(--ink-subtle)">{helperText}</p>
      ) : null}
    </div>
  );
}
