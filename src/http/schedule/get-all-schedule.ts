import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { Schedule } from "@/types/schedule/schedule";

interface GetAllScheduleResponse {
  data: Schedule[];
}

export const getAllScheduleHandler = async (
  token: string
): Promise<GetAllScheduleResponse> => {
  const { data } = await api.get<GetAllScheduleResponse>("/events", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllSchedule = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllScheduleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getAllScheduleHandler(token),
    ...options,
  });
};
