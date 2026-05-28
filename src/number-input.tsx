import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type NumberInputProps = {
  label?: string;
  helperText?: string;
  errorText?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  onValueChange?: (value: number) => void;
};

function clamp(value: number, min?: number, max?: number) {
  let nextValue = value;

  if (min !== undefined) {
    nextValue = Math.max(nextValue, min);
  }

  if (max !== undefined) {
    nextValue = Math.min(nextValue, max);
  }

  return nextValue;
}

export function NumberInput({
  label,
  helperText,
  errorText,
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  placeholder,
  required = false,
  disabled = false,
  id,
  className,
  onValueChange,
}: NumberInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const hasError = Boolean(errorText);

  function commitValue(nextValue: number) {
    const safeValue = clamp(nextValue, min, max);

    if (value === undefined) {
      setInternalValue(safeValue);
    }

    onValueChange?.(safeValue);
  }

  return (
    <div className="w-full">
      {label ? (
        <Label htmlFor={inputId} requiredMark={required} className="mb-2 block">
          {label}
        </Label>
      ) : null}
      <div
        className={cn(
          "flex min-h-12 items-center rounded-2xl border bg-(--surface-card) shadow-(--shadow-sm) transition-colors",
          hasError
            ? "border-(--color-status-error)"
            : "border-(--line-soft) hover:border-(--color-line-strong)",
          className,
        )}
      >
        <button
          type="button"
          onClick={() => commitValue(currentValue - step)}
          disabled={disabled || (min !== undefined && currentValue <= min)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-l-2xl text-(--foreground) transition-colors hover:bg-(--color-surface-hover) disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Decrease value"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          id={inputId}
          type="number"
          value={currentValue}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={(event) => commitValue(Number(event.target.value))}
          className="type-body min-h-12 w-full bg-transparent px-3 text-center text-(--foreground) outline-none disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={() => commitValue(currentValue + step)}
          disabled={disabled || (max !== undefined && currentValue >= max)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-r-2xl text-(--foreground) transition-colors hover:bg-(--color-surface-hover) disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Increase value"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {errorText ? (
        <p className="type-caption mt-2 text-(--color-status-error)">{errorText}</p>
      ) : helperText ? (
        <p className="type-caption mt-2 text-(--ink-subtle)">{helperText}</p>
      ) : null}
    </div>
  );
}
