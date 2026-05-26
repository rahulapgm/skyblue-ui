import { cn } from "./utils";

type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
};

const roundedClasses = {
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const;

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("skeleton-shimmer", roundedClasses[rounded], className)} />;
}
