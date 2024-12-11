import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ChangePasswordForm from "@/components/organisms/settings/ChangePasswordForm";

export default function ChangePasswordDashboard() {
  return (
    <>
      <DashboardTitle title="Ganti Password" />
      <ChangePasswordForm />
    </>
  );
}
