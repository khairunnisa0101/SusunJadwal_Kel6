import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UserList from "@/components/organisms/dashboard/admin/UserList";

export default function DashboardUserAdmin() {
  return (
    <>
      <DashboardTitle title="Pengguna" />
      <UserList />
    </>
  );
}
