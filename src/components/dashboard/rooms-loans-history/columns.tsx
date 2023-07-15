"use client";

import { DataTableColumnHeader } from "@/components/dashboard/rooms-loans-history/data-table-column-header";
import { DataTableRowActions } from "@/components/dashboard/rooms-loans-history/data-table-row-action";
// import { RoomsProps } from "@/lib/validator/dashboard/rooms/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

// export const columns: ColumnDef<RoomsProps>[] = [
export const columns: any = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.firstName",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Nama Peminjam" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "room.name",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Nama Ruangan" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "start",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Waktu Mulai" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "end",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Waktu Selesai" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "isDone",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Selesai" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "keterangan",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Dibuat Pada" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Diubah Pada" />
    ),
    enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }: any) => <DataTableRowActions row={row} />,
  // },
];
