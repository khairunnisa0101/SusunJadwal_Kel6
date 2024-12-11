import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

interface GetAssignmentIncompleteCountResponse {
  data: Number;
}

export const getAssignmentIncompleteCountHandler = async (
  token: string
): Promise<GetAssignmentIncompleteCountResponse> => {
  const { data } = await api.get<GetAssignmentIncompleteCountResponse>(
    "/task/incomplete/count",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAssignmentIncompleteCount = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAssignmentIncompleteCountResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: () => getAssignmentIncompleteCountHandler(token),
    ...options,
  });
};
