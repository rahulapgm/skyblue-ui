import { useId, useState, type KeyboardEvent } from "react";

import { Badge } from "./badge";
import { cn } from "./utils";

export type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
  badge?: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ items, defaultValue, value, onValueChange, className }: TabsProps) {
  const baseId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? "");
  const activeValue = value ?? internalValue;
  const activeItem = items.find((item) => item.value === activeValue) ?? items[0];

  function handleChange(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!items.length) {
      return;
    }

    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    handleChange(items[nextIndex].value);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="inline-flex flex-wrap gap-2 rounded-full border border-(--line-soft) bg-(--surface-card) p-1 shadow-(--shadow-sm)"
      >
        {items.map((item, index) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handleChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            id={`${baseId}-tab-${item.value}`}
            role="tab"
            aria-selected={item.value === activeValue}
            aria-controls={`${baseId}-panel-${item.value}`}
            tabIndex={item.value === activeValue ? 0 : -1}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition-colors",
              item.value === activeValue
                ? "bg-(--color-brand-primary) text-white"
                : "text-(--ink-muted) hover:bg-(--color-surface-hover)",
            )}
          >
            <span>{item.label}</span>
            {item.badge ? <Badge size="sm">{item.badge}</Badge> : null}
          </button>
        ))}
      </div>
      {activeItem ? (
        <div
          id={`${baseId}-panel-${activeItem.value}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeItem.value}`}
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
