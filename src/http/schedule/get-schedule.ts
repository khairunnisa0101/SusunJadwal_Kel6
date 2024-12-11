import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { Schedule } from "@/types/schedule/schedule";

interface GetScheduleResponse {
  data: Schedule[];
}

export const getScheduleHandler = async (
  token: string
): Promise<GetScheduleResponse> => {
  const { data } = await api.get<GetScheduleResponse>("/event", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetSchedule = (
  token: string,
  options?: Partial<UseQueryOptions<GetScheduleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["schedule-single"],
    queryFn: () => getScheduleHandler(token),
    ...options,
  });
};
