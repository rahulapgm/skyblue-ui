import type { ReactNode } from "react";

import { Button, type ButtonSize, type ButtonVariant } from "./button";
import { cn } from "./utils";

type FloatingButtonProps = {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
};

const positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "right-6 top-6",
  "top-left": "left-6 top-6",
} as const;

export function FloatingButton({
  label,
  icon,
  href,
  onClick,
  variant = "primary",
  size = "lg",
  position = "bottom-right",
  className,
}: FloatingButtonProps) {
  const classes = cn("fixed z-30 shadow-(--shadow-primary)", positionClasses[position], className);

  if (href) {
    return (
      <Button href={href} variant={variant} size={size} className={classes}>
        {icon}
        {label}
      </Button>
    );
  }

  return (
    <Button onClick={onClick} variant={variant} size={size} className={classes}>
      {icon}
      {label}
    </Button>
  );
}
