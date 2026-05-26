"use client";

import { Search, X } from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { Label } from "./label";
import { Loader } from "./loader";
import { cn } from "./utils";

export type BasicAutocompleteOption = {
  label: string;
  value: string;
  description?: string;
  keywords?: readonly string[];
};

type AutocompleteProps<TOption> = {
  label?: string;
  value: string;
  options: readonly TOption[];
  onValueChange: (value: string) => void;
  onSelect: (option: TOption) => void | Promise<void>;
  getOptionKey: (option: TOption) => string;
  getOptionLabel: (option: TOption) => string;
  getOptionDescription?: (option: TOption) => string | null | undefined;
  placeholder?: string;
  emptyText?: string;
  helperText?: string;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  minimumQueryLength?: number;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  renderOption?: (option: TOption, state: { active: boolean }) => ReactNode;
  onClear?: () => void;
};

export function Autocomplete<TOption>({
  label,
  value,
  options,
  onValueChange,
  onSelect,
  getOptionKey,
  getOptionLabel,
  getOptionDescription,
  placeholder = "Search",
  emptyText = "No matches found",
  helperText,
  loading = false,
  disabled = false,
  required = false,
  minimumQueryLength = 0,
  className,
  inputClassName,
  listClassName,
  renderOption,
  onClear,
}: AutocompleteProps<TOption>) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasFocus, setHasFocus] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const listboxId = `${id}-listbox`;
  const trimmedValue = value.trim();
  const canShowDropdown = trimmedValue.length >= minimumQueryLength;
  const open = !dismissed && hasFocus && !disabled && canShowDropdown;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setHasFocus(false);
        setDismissed(true);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const safeActiveIndex = useMemo(() => {
    if (!options.length) {
      return 0;
    }

    return Math.min(activeIndex, options.length - 1);
  }, [activeIndex, options.length]);

  function closeDropdown() {
    setHasFocus(false);
    setDismissed(true);
    setActiveIndex(0);
    inputRef.current?.blur();
  }

  async function handleSelect(option: TOption) {
    await onSelect(option);
    closeDropdown();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open && event.key === "ArrowDown" && canShowDropdown) {
      event.preventDefault();
      setDismissed(false);
      return;
    }

    if (!open) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % Math.max(options.length, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + Math.max(options.length, 1)) % Math.max(options.length, 1));
      return;
    }

    if (event.key === "Enter" && options[safeActiveIndex]) {
      event.preventDefault();
      void handleSelect(options[safeActiveIndex]);
      return;
    }

    if (event.key === "Escape" || event.key === "Tab") {
      setHasFocus(false);
      setDismissed(true);
    }
  }

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      {label ? (
        <Label htmlFor={id} requiredMark={required} className="mb-2 block">
          {label}
        </Label>
      ) : null}

      <div className="flex min-h-12 items-center gap-3 rounded-[1rem] border border-(--line-soft) bg-(--surface-card) px-4 shadow-(--shadow-sm)">
        <Search className="h-4 w-4 text-(--ink-subtle)" />
        <input
          ref={inputRef}
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            onValueChange(event.target.value);
            setHasFocus(true);
            setDismissed(false);
            setActiveIndex(0);
          }}
          onFocus={() => {
            setHasFocus(true);
            setDismissed(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && options[safeActiveIndex] ? `${id}-option-${getOptionKey(options[safeActiveIndex])}` : undefined
          }
          className={cn(
            "type-body min-h-12 w-full bg-transparent text-(--foreground) outline-none placeholder:text-(--ink-subtle)",
            inputClassName,
          )}
        />
        {loading ? <Loader label={null} size="sm" className="gap-0" /> : null}
        {!loading && value ? (
          <button
            type="button"
            onClick={() => {
              onValueChange("");
              onClear?.();
              setActiveIndex(0);
              setDismissed(false);
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-(--ink-subtle) transition-colors hover:bg-(--color-surface-hover)"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {helperText ? <p className="type-caption mt-2 text-(--ink-subtle)">{helperText}</p> : null}

      {open && canShowDropdown ? (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className={cn(
            "absolute z-20 mt-2 w-full rounded-[1.2rem] border border-(--line-soft) bg-(--surface-card) p-1.5 shadow-(--shadow-lg)",
            listClassName,
          )}
        >
          {options.length > 0 ? (
            <div className="space-y-1">
              {options.map((option, index) => {
                const optionKey = getOptionKey(option);
                const active = safeActiveIndex === index;

                return (
                  <button
                    key={optionKey}
                    id={`${id}-option-${optionKey}`}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      void handleSelect(option);
                    }}
                    className={cn(
                      "block w-full rounded-[0.95rem] px-3.5 py-2.5 text-left transition-colors",
                      active ? "bg-(--color-surface-hover)" : "bg-transparent hover:bg-(--color-surface-hover)",
                    )}
                  >
                    {renderOption ? (
                      renderOption(option, { active })
                    ) : (
                      <>
                        <span className="type-body block font-medium text-(--foreground)">{getOptionLabel(option)}</span>
                        {getOptionDescription?.(option) ? (
                          <span className="type-caption mt-1 block text-(--ink-subtle)">
                            {getOptionDescription(option)}
                          </span>
                        ) : null}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ) : !loading ? (
            <div className="px-4 py-3">
              <p className="type-caption text-(--ink-subtle)">{emptyText}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
