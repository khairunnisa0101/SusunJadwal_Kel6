import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import PeriodList from "@/components/organisms/dashboard/admin/PeriodList";

export default function DashboardPeriodAdmin() {
  return (
    <>
      <DashboardTitle title="Periode Perkuliahan" />
      <PeriodList />
    </>
  );
}
