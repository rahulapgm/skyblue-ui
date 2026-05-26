import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type SectionSpacing = "sm" | "md" | "lg" | "xl";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "section" | "div" | "main";
  spacing?: SectionSpacing;
  contained?: boolean;
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "gutter-section-sm",
  md: "gutter-section-md",
  lg: "gutter-section-lg",
  xl: "gutter-section-xl",
};

export function Section({
  children,
  as = "section",
  spacing = "lg",
  contained = false,
  className,
  ...props
}: SectionProps) {
  const Component = as;

  return (
    <Component {...props} className={cn(spacingClasses[spacing], contained && "gutter-page", className)}>
      {children}
    </Component>
  );
}
