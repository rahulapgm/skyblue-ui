"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button, type ButtonSize, type ButtonVariant } from "./button";
import { cn } from "./utils";

export type MenuItem = {
  label: string;
  description?: string;
  onSelect?: () => void;
  disabled?: boolean;
  tone?: "default" | "destructive";
};

type MenuProps = {
  label: string;
  items: MenuItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Menu({ label, items, variant = "tertiary", size = "sm", className }: MenuProps) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative inline-flex", className)}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setOpen((current) => !current)}
        aria-label={label}
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </Button>

      {open ? (
        <div
          id={`${id}-menu`}
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 min-w-60 rounded-xl border border-(--line-soft) bg-(--surface-card) p-2 shadow-(--shadow-lg)"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) {
                  return;
                }

                item.onSelect?.();
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-2xl px-4 py-3 text-left transition-colors hover:bg-(--color-surface-hover)",
                item.disabled && "cursor-not-allowed opacity-50",
                item.tone === "destructive" ? "text-(--color-status-error)" : "text-(--foreground)",
              )}
            >
              <span className="type-body block">{item.label}</span>
              {item.description ? (
                <span className="type-caption mt-1 block text-(--ink-subtle)">{item.description}</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
