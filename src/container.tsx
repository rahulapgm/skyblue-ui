import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "7xl" | "full";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
  centered?: boolean;
};

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-[88rem]",
  "3xl": "max-w-[96rem]",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  size = "7xl",
  centered = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={cn("gutter-page w-full", centered && "mx-auto", sizeClasses[size], className)}
    >
      {children}
    </div>
  );
}
