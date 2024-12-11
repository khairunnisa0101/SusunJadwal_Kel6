"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ScheduleCalendar from "@/components/organisms/schedule/ScheduleCalendar";

export default function ScheduleDashboard() {
  return (
    <>
      <DashboardTitle title="Kalender Kuliah" />
      <ScheduleCalendar />
    </>
  );
}
