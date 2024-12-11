"use client";

import { SearchInput } from "@/components/atoms/search/InputSearch";
import ButtonAddSchedule from "@/components/molecules/button/ButtonAddSchedule";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSchedule } from "@/http/schedule/get-schedule";
import { Book } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function CourseList() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isPending } = useGetSchedule(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const schedules =
    data?.data?.filter((schedule) =>
      schedule.nama_matakuliah.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (status === "loading" || isPending) {
    return <CourseListSkeleton />;
  }
  return (
    <>
      <div className="my-6 flex flex-col md:flex-row md:justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari data"
        />
        <ButtonAddSchedule />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {schedules?.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Mata kuliah tidak ditemukan!
          </div>
        ) : (
          schedules?.map((assignment) => (
            <Link
              href={`schedule/${assignment.id}`}
              key={assignment.id}
              className="group block"
            >
              <div className="flex flex-row gap-6">
                <div className="relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg bg-primary group-hover:bg-secondary md:flex">
                  <Book className="m-auto h-12 w-12 text-background" />
                </div>
                <Card className="w-full border-2 border-muted shadow-transparent group-hover:bg-muted">
                  <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-md font-bold md:text-xl">
                        {assignment.nama_matakuliah}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                        {assignment.dosen_pengampu}, Kelas {assignment.kelas}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <span className="text-muted-foreground text-sm flex gap-2">
                      {assignment.ruang_kelas}
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export const CourseListSkeleton = () => {
  return (
    <>
      <div className="my-6 grid grid-cols-1 gap-4">
        <div className="flex gap-6">
          <Skeleton className="h-36 w-36 rounded-xl md:flex hidden" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
        </div>
      </div>
    </>
  );
};
