import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

interface GetAssignmentMissedCountResponse {
  data: Number;
}

export const getAssignmentMissedCountHandler = async (
  token: string
): Promise<GetAssignmentMissedCountResponse> => {
  const { data } = await api.get<GetAssignmentMissedCountResponse>(
    "/task/missed/count",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAssignmentMissedCount = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAssignmentMissedCountResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["missed-counts"],
    queryFn: () => getAssignmentMissedCountHandler(token),
    ...options,
  });
};
