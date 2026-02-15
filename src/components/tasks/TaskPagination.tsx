"use client";

import { Button } from "@/components/ui/button";
import { PaginationMeta } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface TaskPaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function TaskPagination({ meta, onPageChange }: TaskPaginationProps) {
  const { page, totalPages, total, limit, hasNextPage, hasPreviousPage } = meta;

  // Calculate the range of items being displayed
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Results info */}
      <p className="text-sm text-muted-foreground order-2 sm:order-1">
        Showing <span className="font-medium text-foreground">{startItem}</span>{" "}
        to <span className="font-medium text-foreground">{endItem}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> results
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* First page */}
        <Button
          variant="outline"
          size="icon"
          className="hidden sm:flex h-9 w-9"
          onClick={() => onPageChange(1)}
          disabled={!hasPreviousPage}
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">First page</span>
        </Button>

        {/* Previous page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNum, idx) =>
            pageNum === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 font-medium",
                  page === pageNum && "pointer-events-none",
                )}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            ),
          )}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>

        {/* Last page */}
        <Button
          variant="outline"
          size="icon"
          className="hidden sm:flex h-9 w-9"
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage}
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  );
}
