import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { Assignment } from "@/types/assignment/assignment";

interface GetAllAssignmentResponse {
  data: Assignment[];
}

export const getAllAssignmentHandler = async (
  token: string
): Promise<GetAllAssignmentResponse> => {
  const { data } = await api.get<GetAllAssignmentResponse>("/task", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllAssignment = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllAssignmentResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: () => getAllAssignmentHandler(token),
    ...options,
  });
};
