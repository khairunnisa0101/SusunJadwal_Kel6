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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSettingProfile } from "@/http/settings/update-profile";
import {
  profileSettingSchema,
  profileSettingType,
} from "@/validators/settings/profile-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SettingProfileProps {
  session: Session;
}

export default function SettingProfileForm({ session }: SettingProfileProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<profileSettingType>({
    defaultValues: {
      name: session.user.name,
      email: session.user.email,
    },
    mode: "onChange",
    resolver: zodResolver(profileSettingSchema),
  });

  const { mutate: settingProfileHandler, isPending } = useSettingProfile({
    onError: () => {
      toast({
        title: "Gagal Mengubah",
        description: "gagal mengubah informasi akun, cek kembali dan coba lagi",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil Mengubah",
        description: "informasi akun berhasil diubah",
        variant: "success",
      });
      router.refresh();
    },
  });

  const onSubmit = (body: profileSettingType) => {
    settingProfileHandler({ ...body });
  };
  return (
    <>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Pengaturan Akun</CardTitle>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Masukkan mata kuliah"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Masukkan nama lengkap"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" size={"lg"} disabled={isPending}>
                    {isPending ? "Loading..." : "Simpan"}
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
