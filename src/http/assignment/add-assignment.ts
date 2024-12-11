import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Assignment } from "@/types/assignment/assignment";
import { AssignmentType } from "@/validators/assignment/assignment-validator";
import { useSession } from "next-auth/react";

interface AssignmentResponse {
  task: Assignment;
}

export const addAssignmentApiHandler = async (
  body: AssignmentType,
  token: string
): Promise<AssignmentResponse> => {
  const { data } = await api.post("/task", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddAssignment = (
  options?: UseMutationOptions<
    AssignmentResponse,
    AxiosError<any>,
    AssignmentType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: AssignmentType) =>
      addAssignmentApiHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
