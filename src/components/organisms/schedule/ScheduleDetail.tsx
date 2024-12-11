"use client";

import DashboardDetailSchedule from "@/components/atoms/typography/DashboardDetailSchedule";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDetailSchedule } from "@/http/schedule/get-detail-schedule";
import { Assignment } from "@/types/assignment/assignment";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  id: number;
}

export default function ScheduleDetail({ id }: Props) {
  const session = useSession();
  const { data, isPending } = useGetDetailSchedule(
    {
      token: session.data?.access_token as string,
      id,
    },
    { enabled: session.status === "authenticated" }
  );

  if (isPending) {
    return <Skeleton className="h-8 w-72" />;
  }

  const eventName = data?.data?.nama_matakuliah ?? "";

  return (
    <>
      <DashboardDetailSchedule
        id={data?.data?.id ?? 0}
        title={eventName}
        sks={data?.data?.sks ?? 0}
      />
      <div className="md:flex gap-4 md:space-y-0 space-y-4">
        <div className="md:w-4/12">
          <Card className="border !shadow-md">
            <CardHeader>
              <h1 className="text-xl font-bold">Daftar Tugas</h1>
            </CardHeader>
            <CardContent>
              {data?.data?.tasks?.length ? (
                <Accordion type="single" collapsible className="w-full">
                  {data.data.tasks.map((task: Assignment, index: number) => (
                    <div key={task.id}>
                      <p>{task.title}</p>
                    </div>
                  ))}
                </Accordion>
              ) : (
                <p>Hore tidak ada tugas!</p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="md:w-8/12 w-full">
          {data?.data?.tasks?.length ? (
            <div className="w-full space-y-4">
              {data.data.tasks.map((task: Assignment, index: number) => (
                <Card key={task.id} className="border !shadow-md">
                  <CardContent className="p-0 px-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-4"
                    >
                      <AccordionItem value={`task-${index}`}>
                        <AccordionTrigger className="font-semibold">
                          <div className="flex justify-center items-center gap-4">
                            <div className="p-3 rounded-full bg-primary text-white">
                              <BookOpen />
                            </div>
                            <div className="text-left space-y-1">
                              <p className="md:text-base line-clamp-2">
                                {task.title}
                              </p>
                              <p className="text-muted-foreground font-normal text-sm">
                                {new Date(task.start).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 space-y-2">
                          <div className="space-y-2 mb-6">
                            <p className="md:text-base font-bold">Deskripsi</p>
                            <p>{task.description}</p>
                          </div>
                          <div className="flex justify-end">
                            <Button>Lihat instruksi</Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="font-bold md:text-xl text-center">Belum ada tugas!</p>
          )}
        </div>
      </div>
    </>
  );
}
