import Link from "next/link";
import type { ComponentType, MouseEventHandler, ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "./utils";

export type NavigationItem = {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type NavigationBarProps = {
  items: NavigationItem[];
  brand?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

type NavigationRailProps = {
  items: NavigationItem[];
  footer?: ReactNode;
  className?: string;
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function NavigationBar({ items, brand, actions, className }: NavigationBarProps) {
  return (
    <nav
      className={cn(
        "surface-glass flex items-center justify-between gap-6 rounded-xl border border-(--line-soft) px-5 py-4 shadow-(--shadow-sm)",
        className,
      )}
    >
      <div className="flex items-center gap-6">
        {brand}
        {items.length > 0 ? (
          <div className="hidden items-center gap-2 md:flex">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={`${item.href}-${item.label}-${index}`}
                  href={item.href}
                  onClick={item.onClick}
                  className={cn(
                    "type-body inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold transition-colors",
                    item.active
                      ? "bg-(--color-brand-primary-light) text-(--color-brand-primary)"
                      : "text-(--ink-muted) hover:bg-(--color-surface-hover)",
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="type-caption rounded-full bg-(--surface-card) px-2 py-0.5 text-(--foreground)">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
      {actions}
    </nav>
  );
}

export function NavigationRail({ items, footer, className }: NavigationRailProps) {
  return (
    <aside
      className={cn(
        "surface-glass flex w-full max-w-70 flex-col rounded-xl border border-(--line-soft) p-4 shadow-(--shadow-sm)",
        className,
      )}
    >
      <div className="space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={`${item.href}-${item.label}-${index}`}
              href={item.href}
              onClick={item.onClick}
              className={cn(
                "type-body flex items-center justify-between rounded-2xl px-4 py-3 font-bold transition-colors",
                item.active
                  ? "bg-(--color-brand-primary-light) text-(--color-brand-primary)"
                  : "text-(--ink-muted) hover:bg-(--color-surface-hover)",
              )}
            >
              <span className="flex items-center gap-3">
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </span>
              {item.badge ? (
                <span className="type-caption rounded-full bg-(--surface-card) px-2 py-0.5 text-(--foreground)">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
      {footer ? <div className="mt-4 border-t border-(--line-soft) pt-4">{footer}</div> : null}
    </aside>
  );
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="type-caption text-(--ink-subtle) hover:text-(--foreground)">
                {item.label}
              </Link>
            ) : (
              <span className="type-caption text-(--foreground)">{item.label}</span>
            )}
            {!isLast ? <ChevronRight className="h-4 w-4 text-(--ink-subtle)" /> : null}
          </div>
        );
      })}
    </nav>
  );
}
