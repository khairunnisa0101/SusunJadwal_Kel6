import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import PhotoProfile from "@/components/organisms/settings/PhotoProfile";
import SettingProfileForm from "@/components/organisms/settings/SettingProfileForm";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function DashboardSetting() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <DashboardTitle title="Pengaturan" />
      <section className="mt-10">
        <div className="flex flex-col space-y-4">
          <PhotoProfile session={session!} />
          <Link href={"settings/change-password"}>
            <Button variant={"outline"}>Ganti Password</Button>
          </Link>
        </div>
        <SettingProfileForm session={session!} />
      </section>
    </>
  );
}
