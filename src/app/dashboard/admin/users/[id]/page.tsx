import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UserDetail from "@/components/organisms/dashboard/admin/UserDetail";

interface Props {
  params: { id: number };
}

export default function DashboardDetailUser({ params }: Props) {
  return (
    <>
      <DashboardTitle title="Detail Pengguna" />
      <UserDetail id={params.id} />
    </>
  );
}
