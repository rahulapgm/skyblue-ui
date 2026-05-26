import type { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

import { Label } from "./label";
import { cn } from "./utils";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  options: SelectOption[];
  placeholder?: string;
  leadingSlot?: ReactNode;
};

export function Select({
  label,
  helperText,
  errorText,
  options,
  placeholder,
  leadingSlot,
  className,
  id,
  required,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(errorText);

  return (
    <div className="w-full">
      {label ? (
        <Label htmlFor={selectId} requiredMark={required} className="mb-2 block">
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
        <select
          {...props}
          id={selectId}
          required={required}
          className={cn(
            "type-body min-h-12 w-full appearance-none bg-transparent text-(--foreground) outline-none",
            className,
          )}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-(--ink-subtle)" />
      </div>
      {errorText ? (
        <p className="type-body mt-2 text-(--color-status-error)">{errorText}</p>
      ) : helperText ? (
        <p className="type-body mt-2 text-(--ink-subtle)">{helperText}</p>
      ) : null}
    </div>
  );
}
