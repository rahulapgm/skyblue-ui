import type { InputHTMLAttributes } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Checkbox({ label, description, className, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-2xl border border-(--line-soft) bg-(--surface-card) p-4 shadow-(--shadow-sm)",
        className,
      )}
    >
      <input
        {...props}
        id={checkboxId}
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-(--color-line-strong) accent-(--color-brand-primary)"
      />
      <span>
        <Label htmlFor={checkboxId}>{label}</Label>
        {description ? (
          <span className="type-caption mt-1 block text-(--ink-subtle)">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
