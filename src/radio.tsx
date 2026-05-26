import type { InputHTMLAttributes } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Radio({ label, description, className, id, ...props }: RadioProps) {
  const radioId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={radioId}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-2xl border border-(--line-soft) bg-(--surface-card) p-4 shadow-(--shadow-sm)",
        className,
      )}
    >
      <input
        {...props}
        id={radioId}
        type="radio"
        className="mt-1 h-4 w-4 border-(--color-line-strong) accent-(--color-brand-primary)"
      />
      <span>
        <Label htmlFor={radioId}>{label}</Label>
        {description ? (
          <span className="type-caption mt-1 block text-(--ink-subtle)">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
