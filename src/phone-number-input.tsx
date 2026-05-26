import type { InputHTMLAttributes } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type PhoneNumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "inputMode" | "pattern" | "value" | "defaultValue" | "onChange"
> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const INDIA_PHONE_PREFIX = "+91";

function normalizeDigits(value: string | undefined) {
  const digits = (value ?? "").replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length > 10) {
    return digits.slice(2, 12);
  }

  return digits.slice(0, 10);
}

export function PhoneNumberInput({
  label,
  helperText,
  errorText,
  className,
  id,
  required,
  value,
  defaultValue,
  onValueChange,
  placeholder = "9876543210",
  ...props
}: PhoneNumberInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(errorText);
  const resolvedValue = value !== undefined ? normalizeDigits(value) : undefined;
  const resolvedDefaultValue = defaultValue !== undefined ? normalizeDigits(defaultValue) : undefined;

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
        <span className="type-body shrink-0 text-(--foreground)">{INDIA_PHONE_PREFIX}</span>
        <span className="h-6 w-px bg-(--line-soft)" aria-hidden="true" />
        <input
          {...props}
          id={inputId}
          required={required}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="tel-national"
          maxLength={10}
          value={resolvedValue}
          defaultValue={resolvedDefaultValue}
          placeholder={placeholder}
          onChange={(event) => {
            const nextDigits = normalizeDigits(event.target.value);
            event.target.value = nextDigits;
            onValueChange?.(nextDigits);
          }}
          className={cn(
            "type-body min-h-12 w-full bg-transparent text-(--foreground) outline-none placeholder:text-(--ink-subtle)",
            className,
          )}
        />
      </div>
      {errorText ? (
        <p className="type-body mt-2 text-(--color-status-error)">{errorText}</p>
      ) : helperText ? (
        <p className="type-body mt-2 text-(--ink-subtle)">{helperText}</p>
      ) : null}
    </div>
  );
}
