import { z } from "zod";

export const assignmentSchema = z.object({
  title: z.string().min(1, { message: "Title harus diisi" }).trim(),
  event_id: z.number().min(1, { message: "Mata kuliah harus diisi" }),
  start: z.string().min(1, { message: "Start date harus diisi" }).trim(),
  end: z.string().min(1, { message: "End date harus diisi" }).trim(),
  description: z.string().min(1, { message: "Description harus diisi" }).trim(),
});

export type AssignmentType = z.infer<typeof assignmentSchema>;
