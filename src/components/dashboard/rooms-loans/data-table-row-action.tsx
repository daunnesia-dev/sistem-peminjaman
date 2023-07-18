/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { updatePendingStatusRoomLoan } from "@/helpers/dashboard/rooms-loans/update-pending-status-room-loan";
import { cn } from "@/lib/utils";
import { createResponseRoomsLoansProps } from "@/lib/validator/dashboard/rooms-loans/api";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useToast } from "@/ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { user } = useUser();
  const role = user?.publicMetadata.role;
  const roomsLoans = createResponseRoomsLoansProps.parse(row.original);
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, isSuccess, mutate } =
    updatePendingStatusRoomLoan();
  const { toast } = useToast();

  const handleClickReviewing = (roomLoanId: number) => {
    mutate({ roomLoanId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "default",
        title: "Sukses",
        description:
          "Sekarang status peminjaman ruangan telah diubah menjadi direview.",
      });
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat mengubah status peminjaman ruangan.",
      });
    }
  }, [isError, toast]);

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
              {roomsLoans.status === "Pending" && (
                <DropdownMenuItem
                  className={cn("hover:cursor-pointer")}
                  onClick={() => handleClickReviewing(roomsLoans.id)}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                  )}
                  Reviewing
                </DropdownMenuItem>
              )}
              {roomsLoans.status === "Reviewing" && (
                <>
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Terima
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Tolak
                  </DropdownMenuItem>
                </>
              )}
              {(roomsLoans.status === "Diterima" ||
                roomsLoans.status === "Ditolak") &&
                null}
            </>
          )}
          {!role ||
            (role !== "admin" && (
              <>
                {roomsLoans.status === "Pending" && (
                  <DropdownMenuItem className={cn("hover:cursor-pointer")}>
                    Batalkan
                  </DropdownMenuItem>
                )}
                {roomsLoans.status === "Reviewing" && null}
                {roomsLoans.status === "Diterima" && (
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
