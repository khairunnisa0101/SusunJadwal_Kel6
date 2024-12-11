import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Auth } from "@/types/auth/auth";

interface GetAllUserResponse {
  data: Auth[];
}

export const getAllUserHandler = async (
  token: string
): Promise<GetAllUserResponse> => {
  const { data } = await api.get<GetAllUserResponse>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllUser = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllUserResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["user-list"],
    queryFn: () => getAllUserHandler(token),
    ...options,
  });
};
