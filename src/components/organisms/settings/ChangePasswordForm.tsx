"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useChangePassword } from "@/http/settings/change-password";
import {
  changePasswordSchema,
  changePasswordType,
} from "@/validators/settings/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ChangePasswordForm() {
  const { toast } = useToast();
  const form = useForm<changePasswordType>({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate: changePasswordHandler, isPending } = useChangePassword({
    onError: () => {
      toast({
        title: "Gagal Mengubah!",
        description: "Gagal mengubah password, cek kembali dan coba lagi",
        variant: "destructive",
      });
      form.reset();
    },
    onSuccess: () => {
      toast({
        title: "Berhasil Mengubah!",
        description: "Password berhasil diubah",
        variant: "success",
      });
      form.reset();
    },
  });

  const onSubmit = (body: changePasswordType) => {
    changePasswordHandler({ ...body });
  };

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Ganti Password</CardTitle>
            <CardDescription>
              Mohon tidak menyebarluaskan informasi akun anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5 pt-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Lama</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="current_password"
                          placeholder="Masukkan password lama"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Baru</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="new_password"
                          placeholder="Masukkan password baru"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password Baru</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="new_password_confirmation"
                          placeholder="Masukkan konfirmasi password baru"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" size={"lg"} disabled={isPending}>
                    {isPending ? "Loading..." : "Ganti"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
