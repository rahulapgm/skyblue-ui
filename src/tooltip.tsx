"use client";

import { useState, type FocusEvent, type ReactNode } from "react";

import { cn } from "./utils";

type TooltipSide = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  className?: string;
};

const sideClasses: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
};

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [open, setOpen] = useState(false);

  function handleFocus(event: FocusEvent<HTMLSpanElement>) {
    const focusTarget = event.target;

    if (focusTarget instanceof HTMLElement && focusTarget.matches(":focus-visible")) {
      setOpen(true);
    }
  }

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={handleFocus}
      onBlurCapture={() => setOpen(false)}
      onPointerDownCapture={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "type-caption pointer-events-none absolute z-2147483647 whitespace-nowrap rounded-2xl bg-(--color-bg-dark) px-3 py-2 font-bold text-white shadow-(--shadow-lg) transition-opacity",
          open ? "visible opacity-100" : "invisible opacity-0",
          sideClasses[side],
        )}
      >
        {content}
      </span>
    </span>
  );
}
