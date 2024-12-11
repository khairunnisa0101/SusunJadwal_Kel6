import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

interface DeleteResponse {
  message: string;
}

export const deleteUserHandler = async (
  userId: string,
  token: string
): Promise<DeleteResponse> => {
  const { data } = await api.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteUser = (
  options?: UseMutationOptions<DeleteResponse, AxiosError<any>, string>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (userId: string) =>
      deleteUserHandler(userId, sessionData?.access_token as string),
    ...options,
  });
};
