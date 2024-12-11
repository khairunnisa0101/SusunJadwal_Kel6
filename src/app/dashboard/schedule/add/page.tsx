import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import AddScheduleForm from "@/components/organisms/schedule/AddScheduleForm";

export default function AddScheduleDashboard() {
  return (
    <>
      <DashboardTitle title="Tambah Jadwal Kuliah" />
      <AddScheduleForm />
    </>
  );
}
