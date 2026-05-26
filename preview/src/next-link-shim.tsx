import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkShimProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
};

export default function LinkShim({ href, children, ...props }: LinkShimProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
