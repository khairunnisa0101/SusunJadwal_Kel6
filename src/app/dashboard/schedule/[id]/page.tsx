import ScheduleDetail from "@/components/organisms/schedule/ScheduleDetail";

interface DetailScheduleDashboardProps {
  params: { id: number };
}

export default function DetailScheduleDashboard({
  params,
}: DetailScheduleDashboardProps) {
  return (
    <>
      <ScheduleDetail id={params.id} />
    </>
  );
}
