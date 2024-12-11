import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { changePasswordType } from "@/validators/settings/change-password";

interface ChangePasswordResponse {
  message: String;
}

export const changePasswordHandler = async (
  body: changePasswordType,
  token: string
): Promise<ChangePasswordResponse> => {
  const { data } = await api.post("/change-password", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useChangePassword = (
  options?: UseMutationOptions<
    ChangePasswordResponse,
    AxiosError<any>,
    changePasswordType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: changePasswordType) =>
      changePasswordHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
