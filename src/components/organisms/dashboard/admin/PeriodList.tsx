"use client";

import { periodColumns } from "@/components/atoms/datacolumn/PeriodList";
import { usersColumns } from "@/components/atoms/datacolumn/UserList";
import DeleteUserDialog from "@/components/atoms/dialog/DeleteUserDialog";
import { SearchInput } from "@/components/atoms/search/InputSearch";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useToast } from "@/hooks/use-toast";
import { useGetPeriod } from "@/http/admin/period/get-all-period";
import { useDeleteUser } from "@/http/admin/users/delete-user";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PeriodList() {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const session = useSession();
  const [userId, setUserId] = useState<number>(0);
  const { data } = useGetPeriod(session.data?.access_token as string, {
    enabled: session.status === "authenticated",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteUserHandler } = useDeleteUser({
    onError: (error) => {
      toast({
        title: "Gagal menghapus user",
        description: error.response?.data.message,
        variant: "destructive",
      });
      setOpenModalDelete(false);
    },
    onSuccess: () => {
      toast({ title: "Berhasil menghapus user", variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["user-list"],
      });
      setOpenModalDelete(false);
    },
  });

  const handleDelete = (id: number) => {
    setOpenModalDelete(true);
    setUserId(id);
  };

  const handleDeleteUser = () => {
    if (userId) {
      deleteUserHandler(userId.toString());
    }
  };

  const periods =
    data?.data
      ?.filter((period) =>
        period.nama_periode.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((period) => ({
        ...period,
        handleDelete,
      })) || [];
  return (
    <>
      <div className="my-8 flex flex-col md:flex-row md:justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari data"
        />
      </div>
      <div className="flex flex-col items-end">
        <DataTable columns={periodColumns} data={periods} />
      </div>
      <DeleteUserDialog
        setOpen={setOpenModalDelete}
        open={openModalDelete}
        onSubmit={handleDeleteUser}
      />
    </>
  );
}
