"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, KeyRound, Trash2 } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import ActionButton from "@/components/molecules/datatable/ActionButton";
import { Auth } from "@/types/auth/auth";

interface UserRowProps {
  id: number;
  name: string;
  email: string;
  university: string;
  handleDelete: (id: number) => void;
}

export const usersColumns: ColumnDef<UserRowProps>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "university",
    header: "Universitas",
    accessorFn: (row) => row.university || "Belum mengisi",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/users/${user.id}`}
              className="flex items-center text-gray-700  "
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Pengguna</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/users/${user.id}/edit`}
              className="flex items-center text-gray-700  "
            >
              <KeyRound className="h-4 w-4" />
              <span className="ml-2">Reset Password</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => user.handleDelete(user.id)}
            className="cursor-pointer text-red-500 focus:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus Pengguna</span>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
