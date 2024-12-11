import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { ScheduleDetail } from "@/types/schedule/schedule";

interface GetDetailScheduleParams {
  token: string;
  id: number;
}

interface GetDetailScheduleResponse {
  data: ScheduleDetail;
}

export const getDetailScheduleHandler = async ({
  token,
  id,
}: GetDetailScheduleParams): Promise<GetDetailScheduleResponse> => {
  const { data } = await api.get<GetDetailScheduleResponse>(`events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailSchedule = (
  { token, id }: GetDetailScheduleParams,
  options?: Partial<UseQueryOptions<GetDetailScheduleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getDetailScheduleHandler({ token, id }),
    ...options,
  });
};
