import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "./button";
import { cn } from "./utils";

type PaginationProps = {
  pageCount: number;
  currentPage?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

type PageItem = number | "ellipsis";

function createPageItems(pageCount: number, currentPage: number, siblingCount: number) {
  if (pageCount <= 1) {
    return [1];
  }

  const items: PageItem[] = [1];
  const startPage = Math.max(2, currentPage - siblingCount);
  const endPage = Math.min(pageCount - 1, currentPage + siblingCount);

  if (startPage > 2) {
    items.push("ellipsis");
  }

  for (let page = startPage; page <= endPage; page += 1) {
    items.push(page);
  }

  if (endPage < pageCount - 1) {
    items.push("ellipsis");
  }

  if (pageCount > 1) {
    items.push(pageCount);
  }

  return items;
}

export function Pagination({
  pageCount,
  currentPage = 1,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const safePageCount = Math.max(pageCount, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safePageCount);
  const items = createPageItems(safePageCount, safeCurrentPage, siblingCount);

  return (
    <nav className={cn("flex items-center gap-2", className)} aria-label="Pagination">
      <Button
        variant="tertiary"
        size="sm"
        onClick={() => onPageChange?.(safeCurrentPage - 1)}
        disabled={safeCurrentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex min-h-10 min-w-10 items-center justify-center text-(--ink-subtle)"
          >
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ) : (
          <Button
            key={item}
            variant={item === safeCurrentPage ? "primary" : "tertiary"}
            size="sm"
            onClick={() => onPageChange?.(item)}
            aria-label={`Go to page ${item}`}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="tertiary"
        size="sm"
        onClick={() => onPageChange?.(safeCurrentPage + 1)}
        disabled={safeCurrentPage >= safePageCount}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
