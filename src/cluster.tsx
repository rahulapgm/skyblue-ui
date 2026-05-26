import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
type ClusterAlign = "start" | "center" | "end" | "stretch";
type ClusterJustify = "start" | "center" | "end" | "between";

type ClusterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  gap?: ClusterGap;
  align?: ClusterAlign;
  justify?: ClusterJustify;
};

const gapClasses: Record<ClusterGap, string> = {
  xs: "gutter-cluster-xs",
  sm: "gutter-cluster-sm",
  md: "gutter-cluster-md",
  lg: "gutter-cluster-lg",
  xl: "gutter-grid-xl",
};

const alignClasses: Record<ClusterAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses: Record<ClusterJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Cluster({
  children,
  gap = "md",
  align = "center",
  justify = "start",
  className,
  ...props
}: ClusterProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-wrap",
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
    >
      {children}
    </div>
  );
}
