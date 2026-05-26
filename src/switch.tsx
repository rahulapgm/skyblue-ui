"use client";

import type { InputHTMLAttributes } from "react";

import { Label } from "./label";
import { cn } from "./utils";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Switch({
  label,
  description,
  className,
  id,
  checked,
  defaultChecked,
  ...props
}: SwitchProps) {
  const switchId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const isChecked = checked ?? defaultChecked;

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-(--line-soft) bg-(--surface-card) p-4 shadow-(--shadow-sm)",
        className,
      )}
    >
      <span>
        <Label htmlFor={switchId}>{label}</Label>
        {description ? (
          <span suppressHydrationWarning className="type-body mt-1 block text-(--ink-subtle)">
            {description}
          </span>
        ) : null}
      </span>
      <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
        <input
          {...props}
          id={switchId}
          checked={checked}
          defaultChecked={defaultChecked}
          type="checkbox"
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-(--color-line-strong) transition-colors peer-checked:bg-(--color-brand-primary)" />
        <span
          className={cn(
            "absolute left-1 h-5 w-5 rounded-full bg-white shadow-(--shadow-sm) transition-transform peer-checked:translate-x-5",
            isChecked && "translate-x-5",
          )}
        />
      </span>
    </label>
  );
}
