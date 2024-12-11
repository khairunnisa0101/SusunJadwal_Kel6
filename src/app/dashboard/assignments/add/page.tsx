import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import AddAssignmentForm from "@/components/organisms/assignment/AddAssignmentForm";

export default function AddAssignmentDashboard() {
  return (
    <>
      <DashboardTitle title="Tambah Tugas" />
      <AddAssignmentForm />
    </>
  );
}
