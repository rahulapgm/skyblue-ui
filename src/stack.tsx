import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackAlign = "start" | "center" | "end" | "stretch";

type StackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  gap?: StackGap;
  align?: StackAlign;
};

const gapClasses: Record<StackGap, string> = {
  xs: "gutter-grid-xs",
  sm: "gutter-grid-sm",
  md: "gutter-grid-md",
  lg: "gutter-grid-lg",
  xl: "gutter-grid-xl",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({ children, gap = "md", align = "stretch", className, ...props }: StackProps) {
  return (
    <div {...props} className={cn("flex flex-col", gapClasses[gap], alignClasses[align], className)}>
      {children}
    </div>
  );
}
