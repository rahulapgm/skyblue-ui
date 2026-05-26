import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  requiredMark?: boolean;
};

export function Label({ children, requiredMark = false, className, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn("type-title inline-flex items-center gap-1 text-(--foreground)", className)}
    >
      <span>{children}</span>
      {requiredMark ? <span className="text-(--color-status-error)">*</span> : null}
    </label>
  );
}
