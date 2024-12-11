"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAddAssignment } from "@/http/assignment/add-assignment";
import { useForm } from "react-hook-form";
import {
  assignmentSchema,
  AssignmentType,
} from "@/validators/assignment/assignment-validator";
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
import { Textarea } from "@/components/ui/textarea";
import ScheduleField from "@/components/atoms/fields/ScheduleField";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const AddAssignmentForm = () => {
  const form = useForm<AssignmentType>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      event_id: 1,
      start: "",
      end: "",
      description: "",
    },
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addAssignmentHandler, isPending } = useAddAssignment({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan assignment",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({ title: "Berhasil menambahkan assignment", variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      });
      router.back();
    },
  });

  const onSubmit = (body: AssignmentType) => {
    addAssignmentHandler({ ...body });
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Tugas</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan nama tugas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        *Contoh: Laporan Praktikum Multimedia
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="event_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mata Kuliah</FormLabel>
                      <FormControl>
                        <ScheduleField
                          value={field.value as number}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea id="deskripsi" {...field} />
                    </FormControl>
                    <FormDescription>*Opsional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex grid md:grid-cols-2 grid-cols-1 md:gap-4 md:space-y-0 space-y-5">
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu diberikan tugas</FormLabel>
                      <FormControl>
                        <Input
                          className="text-muted-foreground"
                          type="date"
                          id="start"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenggat Tugas</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="text-muted-foreground"
                          id="end"
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

export default AddAssignmentForm;
