/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { updatePendingStatusRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-pending-rooms-loans";
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
import { useToast } from "@/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

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
  const { toast } = useToast();
  const {
    isSuccess: isUpdatePendingStatusSuccess,
    mutate: updatePendingStatus,
    isLoading: isUpdatePendingStatusLoading,
    isError: isUpdatePendingStatusError,
  } = updatePendingStatusRoomsLoans();

  const handleUpdatePendingStatus = () => {
    updatePendingStatus({
      id: roomsLoans.id,
    });
  };

  useEffect(() => {
    if (isUpdatePendingStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman ruangan telah diubah menjadi direview.",
      });
    }

    if (isUpdatePendingStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman ruangan.",
      });
    }
  }, [isUpdatePendingStatusSuccess, isUpdatePendingStatusError]);

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
                  onClick={() => handleUpdatePendingStatus()}
                >
                  {isUpdatePendingStatusLoading && (
                    <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                  )}
                  Reviewing
                </DropdownMenuItem>
              )}
              {roomsLoans.status === "Direview" && (
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
