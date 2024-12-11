import { z } from "zod";

export const scheduleSchema = z.object({
  nama_matakuliah: z
    .string()
    .min(1, { message: "Mata kuliah harus diisi" })
    .trim(),
  start_time: z.string().min(1, { message: "Waktu mulai harus diisi" }).trim(),
  end_time: z.string().min(1, { message: "Waktu selesai harus diisi" }).trim(),
  dosen_pengampu: z
    .string()
    .min(1, { message: "Nama dosen harus diisi" })
    .trim(),
  sks: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "SKS harus diisi dengan angka positif",
    }),
  kelas: z.string().min(1, { message: "Nama kelas harus diisi" }).trim(),
  ruang_kelas: z.string().min(1, { message: "Ruang kelas harus diisi" }).trim(),
  days: z.string().min(1, { message: "Hari harus dipilih" }).trim(), // Menambahkan validasi untuk days
});

export type ScheduleType = z.infer<typeof scheduleSchema>;
