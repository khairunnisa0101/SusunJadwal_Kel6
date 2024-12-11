import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Password lama harus diisi." })
      .trim(),
    new_password: z.string().min(1, { message: "Password baru harus diisi." }),
    new_password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi password baru harus diisi" }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Konfirmasi password harus sama dengan password.",
    path: ["new_password_confirmation"],
  });

export type changePasswordType = z.infer<typeof changePasswordSchema>;
