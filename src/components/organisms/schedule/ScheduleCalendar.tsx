import { Card, CardHeader } from "@/components/ui/card";
import { useGetAllSchedule } from "@/http/schedule/get-all-schedule";
import FullCalendar from "@fullcalendar/react";
import { useSession } from "next-auth/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg, EventApi } from "@fullcalendar/core";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function ScheduleCalendar() {
  const session = useSession();
  const { data } = useGetAllSchedule(session.data?.access_token as string, {
    enabled: session.status === "authenticated",
  });

  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const events = useMemo(
    () =>
      data?.data?.map((event) => ({
        id: event.id.toString(),
        title: event.nama_matakuliah,
        start_time: event.start_time,
        end_time: event.end_time,
        date: event.date,
        extendedProps: {
          dosen: event.dosen_pengampu,
          ruang: event.ruang_kelas,
          sks: event.sks,
        },
      })) || [],
    [data]
  );

  const renderEventContent = (eventInfo: any) => {
    return (
      <div>
        <div>{eventInfo.timeText}</div>
        <strong>{eventInfo.event.title}</strong>
      </div>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
    setSelectedEvent(clickInfo.event);
  };

  return (
    <div className="my-6">
      <Card className="border !shadow-md">
        <CardHeader>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={
              isMobile
                ? {
                    left: "",
                    center: "title",
                    right: "",
                  }
                : {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                  }
            }
            eventClassNames="bg-primary text-white cursor-pointer"
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            height="100%"
            contentHeight="auto"
            titleFormat={
              isMobile
                ? { month: "short", year: "numeric" }
                : { month: "long", year: "numeric" }
            }
          />
        </CardHeader>
      </Card>

      {selectedEvent && (
        <Dialog
          open={selectedEvent !== null}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={isMobile ? "text-lg" : "text-xl"}>
                {selectedEvent.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Jam Kuliah:</span>{" "}
                {format(
                  selectedEvent.start || "Tanggal tidak tersedia",
                  "EEEE d MMMM yyyy, HH:mm:ss",
                  { locale: id }
                )}{" "}
              </p>
              <p>
                <span className="font-semibold">Dosen:</span>{" "}
                {selectedEvent.extendedProps.dosen}
              </p>
              <p>
                <span className="font-semibold">Ruang:</span>{" "}
                {selectedEvent.extendedProps.ruang}
              </p>
              <p>
                <span className="font-semibold">Jumlah SKS:</span>{" "}
                {selectedEvent.extendedProps.sks}
              </p>
            </div>
            <DialogFooter>
              <Button>
                <Link href={`/dashboard/schedule/${selectedEvent.id}`}>
                  Detail Kelas
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
