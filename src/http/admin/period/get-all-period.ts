import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Period } from "@/types/period/period";

interface GetPeriodResponse {
  data: Period[];
}

export const getPeriodHandler = async (
  token: string
): Promise<GetPeriodResponse> => {
  const { data } = await api.get<GetPeriodResponse>("/period", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetPeriod = (
  token: string,
  options?: Partial<UseQueryOptions<GetPeriodResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["period-list"],
    queryFn: () => getPeriodHandler(token),
    ...options,
  });
};
