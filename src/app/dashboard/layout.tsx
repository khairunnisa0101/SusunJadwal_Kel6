import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import Sidenav from "@/components/organisms/side/SideNav";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return <Sidenav session={session!}>{children}</Sidenav>;
}
