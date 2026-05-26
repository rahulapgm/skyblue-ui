import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { buttonBaseClasses, buttonVariantClasses, type ButtonVariant } from "./button";
import { cn } from "./utils";

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = ButtonVariant | "ghost";

type SharedIconButtonProps = {
  icon: ReactNode;
  ariaLabel: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
};

type IconButtonProps =
  | (SharedIconButtonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (SharedIconButtonProps & {
      href: string;
    });

const iconButtonVariantClasses: Record<IconButtonVariant, string> = {
  ...buttonVariantClasses,
  ghost: "bg-transparent text-(--foreground) shadow-none hover:bg-(--color-surface-hover)",
};

const iconButtonSizeClasses: Record<IconButtonSize, string> = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

export function IconButton(props: IconButtonProps) {
  const { icon, ariaLabel, variant = "tertiary", size = "md", className } = props;

  const classes = cn(
    buttonBaseClasses,
    "rounded-full p-0",
    iconButtonVariantClasses[variant],
    iconButtonSizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} aria-label={ariaLabel} className={classes}>
        {icon}
      </Link>
    );
  }

  const {
    type = "button",
    ariaLabel: omittedAriaLabel,
    icon: omittedIcon,
    variant: omittedVariant,
    size: omittedSize,
    className: omittedClassName,
    ...buttonProps
  } = props as Extract<IconButtonProps, { href?: undefined }>;

  void omittedAriaLabel;
  void omittedIcon;
  void omittedVariant;
  void omittedSize;
  void omittedClassName;

  return (
    <button {...buttonProps} type={type} aria-label={ariaLabel} className={classes}>
      {icon}
    </button>
  );
}
