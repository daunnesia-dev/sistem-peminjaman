/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { cn } from "@/lib/utils";
import { createResponseBooksLoansProps } from "@/lib/validator/dashboard/book-loans/api";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { user } = useUser();
  const role = user?.publicMetadata.role;
  const booksLoans = createResponseBooksLoansProps.parse(row.original);
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(!open)}>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuGroup onClick={() => setOpen(true)}>
          <DropdownMenuItem className={cn("hover:cursor-pointer")}>
            Detail
          </DropdownMenuItem>
          {role === "admin" && (
            <>
              {booksLoans.status === "Pending" && (
                <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                  Reviewing
                </DropdownMenuItem>
              )}
              {booksLoans.status === "Reviewing" && (
                <>
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Terima
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Tolak
                  </DropdownMenuItem>
                </>
              )}
              {(booksLoans.status === "Diterima" ||
                booksLoans.status === "Ditolak") &&
                null}
            </>
          )}
          {!role ||
            (role !== "admin" && (
              <>
                {booksLoans.status === "Pending" && (
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Batalkan
                  </DropdownMenuItem>
                )}
                {booksLoans.status === "Reviewing" && null}
                {booksLoans.status === "Diterima" && (
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Kembalikan
                  </DropdownMenuItem>
                )}
              </>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
