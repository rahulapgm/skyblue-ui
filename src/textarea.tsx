import type { TextareaHTMLAttributes } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  errorText?: string;
};

export function Textarea({
  label,
  helperText,
  errorText,
  className,
  id,
  required,
  rows = 5,
  ...props
}: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(errorText);

  return (
    <div className="w-full">
      {label ? (
        <Label htmlFor={textareaId} requiredMark={required} className="mb-2 block">
          {label}
        </Label>
      ) : null}
      <textarea
        {...props}
        id={textareaId}
        required={required}
        rows={rows}
        className={cn(
          "type-body min-h-32 w-full rounded-2xl border bg-(--surface-card) px-4 py-3 text-(--foreground) shadow-(--shadow-sm) outline-none transition-colors placeholder:text-(--ink-subtle)",
          hasError
            ? "border-(--color-status-error)"
            : "border-(--line-soft) hover:border-(--color-line-strong)",
          className,
        )}
      />
      {errorText ? (
        <p className="type-caption mt-2 text-(--color-status-error)">{errorText}</p>
      ) : helperText ? (
        <p className="type-caption mt-2 text-(--ink-subtle)">{helperText}</p>
      ) : null}
    </div>
  );
}
