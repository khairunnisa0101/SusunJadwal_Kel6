import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonAddSchedule() {
  return (
    <>
      <div>
        <Link href={"/dashboard/schedule/add"}>
          <Button className="w-full sm:w-max" variant="default">
            Tambah Jadwal Kuliah
          </Button>
        </Link>
      </div>
    </>
  );
}
