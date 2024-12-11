import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Schedule } from "@/types/schedule/schedule";
import { ScheduleType } from "@/validators/schedule/schedule-validator";

interface ScheduleResponse {
  events: Schedule;
}

export const addScheduleHandler = async (
  body: ScheduleType,
  token: string
): Promise<ScheduleResponse> => {
  const { data } = await api.post("/events", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddSchedule = (
  options?: UseMutationOptions<ScheduleResponse, AxiosError<any>, ScheduleType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ScheduleType) =>
      addScheduleHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
