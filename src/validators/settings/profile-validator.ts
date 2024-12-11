import { z } from "zod";

export const profileSettingSchema = z.object({
  name: z.string().min(1, { message: "Title harus diisi" }).trim(),
  email: z.string().min(1, { message: "Start date harus diisi" }).trim(),
});

export type profileSettingType = z.infer<typeof profileSettingSchema>;
