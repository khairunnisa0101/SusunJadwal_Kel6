"use client";

import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Book,
  CalendarFold,
  ClipboardCheck,
  CircleHelpIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  LucideIcon,
  User,
  TimerReset,
} from "lucide-react";
import { Session } from "next-auth";
import SideNavL from "@/components/atoms/sidenav/SideNavL";
import SideNavHeader from "@/components/atoms/sidenav/SideNavHeader";

export interface Link {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  hide?: boolean;
}

interface SidenavProps extends PropsWithChildren {
  session: Session;
}

export default function Sidenav({ children, session }: SidenavProps) {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      ...(session?.user.role === "admin"
        ? [
            {
              href: "/dashboard/admin",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/admin",
            },
            {
              href: "/dashboard/admin/users",
              label: "Pengguna",
              icon: User,
              active: pathname.startsWith("/dashboard/admin/users"),
            },
            {
              href: "/dashboard/admin/period",
              label: "Periode",
              icon: TimerReset,
              active: pathname.startsWith("/dashboard/admin/period"),
            },
          ]
        : [
            {
              href: "/dashboard",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard",
            },
            {
              href: "/dashboard/course",
              label: "Mata Kuliah",
              icon: Book,
              active: pathname.startsWith("/dashboard/course"),
            },
            {
              href: "/dashboard/schedule",
              label: "Jadwal Kuliah",
              icon: CalendarFold,
              active: pathname.startsWith("/dashboard/schedule"),
            },
            {
              href: "/dashboard/assignments",
              label: "Tugas",
              icon: ClipboardCheck,
              active: pathname.startsWith("/dashboard/assignments"),
            },
          ]),
      {
        href: "/dashboard/settings",
        label: "Pengaturan",
        active: pathname.startsWith("/dashboard/settings"),
        icon: Settings2Icon,
      },
      {
        href: "#",
        label: "Bantuan",
        active: pathname.startsWith("/dashboard/bantuan"),
        icon: CircleHelpIcon,
      },
    ],
    [session, pathname]
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNavL links={links} />
      <div className="flex max-h-screen flex-col overflow-y-auto">
        <SideNavHeader session={session} links={links} />
        <main className="mt-16 flex flex-1 flex-col gap-4 p-4 md:px-20 md:py-6 lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
