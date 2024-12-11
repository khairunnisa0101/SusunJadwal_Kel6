"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  scheduleSchema,
  ScheduleType,
} from "@/validators/schedule/schedule-validator";
import { useAddSchedule } from "@/http/schedule/create-schedule";

const daysOptions = [
  { value: "Senin", label: "Senin" },
  { value: "Selasa", label: "Selasa" },
  { value: "Rabu", label: "Rabu" },
  { value: "Kamis", label: "Kamis" },
  { value: "Jumat", label: "Jumat" },
  { value: "Sabtu", label: "Sabtu" },
  { value: "Minggu", label: "Minggu" },
];

const AddScheduleForm = () => {
  const form = useForm<ScheduleType>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      nama_matakuliah: "",
      start_time: "",
      end_time: "",
      dosen_pengampu: "",
      sks: 0,
      kelas: "",
      ruang_kelas: "",
      days: "",
    },
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addScheduleHandler, isPending } = useAddSchedule({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan jadwal kuliah!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan jadwal kuliah!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["schedule"],
      });
      router.push("/dashboard/course");
    },
  });

  const onSubmit = (body: ScheduleType) => {
    addScheduleHandler({ ...body });
  };

  return (
    <div className="my-6">
      <Card className="border !shadow-md">
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex grid md:grid-cols-2 grid-cols-1 md:gap-4 md:space-y-0 space-y-5">
                <FormField
                  control={form.control}
                  name="nama_matakuliah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mata Kuliah</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="nama_matakuliah"
                          placeholder="Masukkan mata kuliah"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>*Contoh: Struktur Data</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dosen_pengampu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosen Pengampu</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="dosen_pengampu"
                          placeholder="Masukkan nama dosen pengampu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="sks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKS</FormLabel>
                    <FormControl>
                      <Input type="number" id="sks" {...field} />
                    </FormControl>
                    <FormDescription>
                      *Harus berupa angka, contoh: 4
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kelas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelas</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="kelas"
                        placeholder="Masukkan nama kelas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ruang_kelas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ruang Kelas</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="ruang_kelas"
                        placeholder="Masukkan ruang kelas"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>*Contoh: B. 101 | T.KOM</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue=""
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih hari" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      *Pilih hari kuliah dari daftar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex grid md:grid-cols-2 grid-cols-1 md:gap-4 md:space-y-0 space-y-5">
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Mulai</FormLabel>
                      <FormControl>
                        <Input
                          className="text-muted-foreground"
                          type="time"
                          id="start_time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Selesai</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          className="text-muted-foreground"
                          id="end_time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" size={"lg"} disabled={isPending}>
                  {isPending ? "Loading..." : "Tambahkan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddScheduleForm;
