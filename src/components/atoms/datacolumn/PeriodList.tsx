"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import ActionButton from "@/components/molecules/datatable/ActionButton";
import { Period } from "@/types/period/period";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface PeriodRowProps extends Period {
  handleDelete: (id: number) => void;
}

export const periodColumns: ColumnDef<PeriodRowProps>[] = [
  {
    accessorKey: "nama_periode",
    header: "Periode",
  },
  {
    accessorKey: "start_date",
    header: "Awal Periode",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(data.start_date, "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: "Akhir Periode",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(data.end_date, "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const period = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/period/${period.id}`}
              className="flex items-center text-gray-700  "
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit Periode</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => period.handleDelete(period.id)}
            className="cursor-pointer text-red-500 focus:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus Periode</span>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
