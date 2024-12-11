"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import AssignmentList from "@/components/organisms/assignment/AssignmentList";

export default function AssignmentDashboard() {
  return (
    <>
      <DashboardTitle title="Catatan Tugas" />
      <AssignmentList />
    </>
  );
}
