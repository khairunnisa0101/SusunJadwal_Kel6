import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonAddAssignment() {
  return (
    <>
      <div>
        <Link href={"/dashboard/assignments/add"}>
          <Button className="w-full sm:w-max" variant="default">
            Tambah Tugas
          </Button>
        </Link>
      </div>
    </>
  );
}
