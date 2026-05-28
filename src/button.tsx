import Link from "next/link.js";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
};

type ButtonProps =
  | (SharedButtonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (SharedButtonProps & {
      href: string;
      ariaLabel?: string;
    });

export const buttonBaseClasses =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-extrabold no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-(--color-brand-primary) !text-(--color-fg-inverse) visited:!text-(--color-fg-inverse) hover:!text-(--color-fg-inverse) active:!text-(--color-fg-inverse) shadow-(--shadow-primary) hover:bg-(--color-brand-primary-hover) active:bg-(--color-brand-primary-active) focus-visible:ring-(--color-brand-primary-light)",
  secondary:
    "border border-(--color-brand-secondary) bg-(--color-brand-secondary) !text-(--color-fg-inverse) visited:!text-(--color-fg-inverse) hover:!text-(--color-fg-inverse) active:!text-(--color-fg-inverse) shadow-(--shadow-md) hover:bg-(--color-brand-secondary-light) active:border-(--color-bg-dark) active:bg-(--color-bg-dark) focus-visible:ring-(--color-brand-primary-light)",
  tertiary:
    "border border-(--color-brand-secondary) bg-(--surface-card) !text-(--color-brand-secondary) visited:!text-(--color-brand-secondary) hover:!text-(--color-brand-secondary) active:!text-(--color-brand-secondary) shadow-(--shadow-sm) hover:bg-(--color-surface-muted) focus-visible:ring-(--color-brand-primary-light)",
  destructive:
    "bg-[#ff3131] !text-(--color-fg-inverse) visited:!text-(--color-fg-inverse) hover:!text-(--color-fg-inverse) active:!text-(--color-fg-inverse) shadow-(--shadow-md) hover:bg-[#e62b2b] active:bg-[#cc2525] focus-visible:ring-(--color-status-error-light)",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 type-body",
  md: "min-h-12 px-5 type-body",
  lg: "min-h-14 px-7 type-title",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className, fullWidth = false } = props;

  const classes = cn(
    buttonBaseClasses,
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, ariaLabel } = props;

    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as Extract<ButtonProps, { href?: undefined }>;
  const {
    children: _children,
    variant: _variant,
    size: _size,
    className: _className,
    fullWidth: _fullWidth,
    ...nativeButtonProps
  } = buttonProps;
  void _children;
  void _variant;
  void _size;
  void _className;
  void _fullWidth;

  return (
    <button {...nativeButtonProps} type={type} className={classes}>
      {children}
    </button>
  );
}
