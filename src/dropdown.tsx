"use client";

import { ChevronDown, Check } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "./utils";

export type DropdownOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

type DropdownProps = {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  helperText?: string;
  fullWidth?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Dropdown({
  label,
  placeholder = "Select an option",
  options,
  value,
  defaultValue,
  helperText,
  fullWidth = true,
  onValueChange,
  className,
}: DropdownProps) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === currentValue);
  const listboxId = `${id}-listbox`;
  const selectedIndex = options.findIndex((option) => option.value === currentValue && !option.disabled);
  const firstEnabledIndex = options.findIndex((option) => !option.disabled);
  const initialActiveIndex =
    selectedIndex >= 0 ? selectedIndex : firstEnabledIndex >= 0 ? firstEnabledIndex : 0;
  const safeActiveIndex = options[activeIndex] ? activeIndex : initialActiveIndex;

  function findNextEnabledIndex(startIndex: number, direction: 1 | -1) {
    if (!options.length) {
      return 0;
    }

    let nextIndex = startIndex;

    for (let count = 0; count < options.length; count += 1) {
      nextIndex = (nextIndex + direction + options.length) % options.length;
      if (!options[nextIndex]?.disabled) {
        return nextIndex;
      }
    }

    return startIndex;
  }

  function commitValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setActiveIndex(initialActiveIndex);
      setOpen(true);
      return;
    }

    if (!open) {
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => findNextEnabledIndex(current, 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => findNextEnabledIndex(current, -1));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const option = options[safeActiveIndex];
      if (option && !option.disabled) {
        commitValue(option.value);
      }
    }

    if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className={cn("relative", fullWidth && "w-full", className)}>
      {label ? (
        <label htmlFor={id} className="type-caption mb-2 block text-(--foreground)">
          {label}
        </label>
      ) : null}
      <button
        id={id}
        type="button"
        onClick={() => {
          setActiveIndex(initialActiveIndex);
          setOpen((current) => !current);
        }}
        onKeyDown={handleKeyDown}
        className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-(--line-soft) bg-(--surface-card) px-4 py-3 text-left shadow-(--shadow-sm) transition-colors hover:border-(--color-line-strong)"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
      >
        <span className={cn("type-body", selectedOption ? "text-(--foreground)" : "text-(--ink-subtle)")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 text-(--ink-subtle) transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full rounded-3xl border border-(--line-soft) bg-(--surface-card) p-2 shadow-(--shadow-lg)">
          <div id={listboxId} role="listbox" aria-labelledby={id} className="space-y-1">
            {options.map((option, index) => {
              const selected = option.value === currentValue;

              return (
                <button
                  key={option.value}
                  id={`${id}-option-${option.value}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={option.disabled}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commitValue(option.value)}
                  className={cn(
                    "flex w-full items-start justify-between rounded-2xl px-4 py-3 text-left transition-colors",
                    index === safeActiveIndex ? "bg-(--color-surface-hover)" : "bg-transparent",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <span>
                    <span className="type-body block text-(--foreground)">{option.label}</span>
                    {option.description ? (
                      <span className="type-caption mt-1 block text-(--ink-subtle)">
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                  {selected ? <Check className="mt-1 h-4 w-4 text-(--color-brand-primary)" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {helperText ? <p className="type-caption mt-2 text-(--ink-subtle)">{helperText}</p> : null}
    </div>
  );
}
