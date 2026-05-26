import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
type GridGap = "xs" | "sm" | "md" | "lg" | "xl";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  cols?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
  xl?: GridColumns;
  gap?: GridGap;
};

const columnClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smColumnClasses: Record<GridColumns, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdColumnClasses: Record<GridColumns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgColumnClasses: Record<GridColumns, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

const xlColumnClasses: Record<GridColumns, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  12: "xl:grid-cols-12",
};

const gapClasses: Record<GridGap, string> = {
  xs: "gutter-grid-xs",
  sm: "gutter-grid-sm",
  md: "gutter-grid-md",
  lg: "gutter-grid-lg",
  xl: "gutter-grid-xl",
};

export function Grid({ children, cols = 1, sm, md, lg, xl, gap = "md", className, ...props }: GridProps) {
  return (
    <div
      {...props}
      className={cn(
        "grid",
        columnClasses[cols],
        gapClasses[gap],
        sm && smColumnClasses[sm],
        md && mdColumnClasses[md],
        lg && lgColumnClasses[lg],
        xl && xlColumnClasses[xl],
        className,
      )}
    >
      {children}
    </div>
  );
}
