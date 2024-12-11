import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

interface GetAssignmentUpcomingCountResponse {
  data: Number;
}

export const getAssignmentUpcomingCountHandler = async (
  token: string
): Promise<GetAssignmentUpcomingCountResponse> => {
  const { data } = await api.get<GetAssignmentUpcomingCountResponse>(
    "/task/upcoming/count",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAssignmentUpcomingCount = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAssignmentUpcomingCountResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["upcoming-count"],
    queryFn: () => getAssignmentUpcomingCountHandler(token),
    ...options,
  });
};
