import { Settings } from "lucide-react";
import Link from "next/link";

interface DashboardTitleProps {
  title: string;
  sks: number;
  id: number;
}

export default function DashboardDetailSchedule({
  title,
  sks,
  id,
}: DashboardTitleProps) {
  return (
    <div
      className="flex justify-between min-h-[250px] text-white"
      style={{
        backgroundImage: "url(/assets/images/computer-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        borderRadius: "8px",
      }}
    >
      <div className="space-y-3">
        <h1 className="font-paytone text-4xl">{title}</h1>
        <p className="text-xl">{sks} SKS</p>
      </div>
      <Link href={`/dashboard/schedule/${id}/setting`}>
        <div className="w-fit p-2 rounded-full bg-white text-primary">
          <Settings />
        </div>
      </Link>
    </div>
  );
}
