import { SearchInput } from "@/components/atoms/search/InputSearch";
import ButtonAddAssignment from "@/components/molecules/button/ButtonAddAssignment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllAssignment } from "@/http/assignment/get-all-assignment";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ClipboardCheck, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AssignmentList() {
  const session = useSession();
  const { data, isPending } = useGetAllAssignment(
    session.data?.access_token as string,
    {
      enabled: session.status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const assignments = Array.isArray(data?.data)
    ? data.data.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isPending) {
    return <AssignmentSkeleton />;
  }

  return (
    <>
      <div className="my-6 flex flex-col md:flex-row md:justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari data"
        />
        <ButtonAddAssignment />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {assignments?.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Tugas tidak ditemukan!
          </div>
        ) : (
          assignments?.map((assignment) => (
            <Link
              href={`assignments/${assignment.id}`}
              key={assignment.id}
              className="group block"
            >
              <div className="flex flex-row gap-6">
                <div className="relative hidden aspect-video h-36 w-36 items-center justify-center rounded-lg bg-primary group-hover:bg-secondary md:flex">
                  <ClipboardCheck className="m-auto h-12 w-12 text-background" />
                </div>
                <Card className="w-full border-2 border-muted shadow-transparent group-hover:bg-muted">
                  <CardHeader className="flex md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-md font-bold md:text-xl">
                        {assignment.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                        {assignment.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <span className="text-muted-foreground text-sm flex gap-2">
                      <Clock className="h-4 w-4" />
                      {format(assignment.end, "d MMMM yyyy, HH:mm:ss", {
                        locale: id,
                      })}
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export const AssignmentSkeleton = () => {
  return (
    <>
      <div className="my-6 grid grid-cols-1 gap-4">
        <div className="flex gap-6">
          <Skeleton className="h-36 w-36 rounded-xl md:flex hidden" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
        </div>
      </div>
    </>
  );
};
