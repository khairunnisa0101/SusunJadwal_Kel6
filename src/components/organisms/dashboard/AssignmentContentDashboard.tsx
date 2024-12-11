import CardAssignment, {
  CardCountSkeleton,
} from "@/components/molecules/card/CardAssignmentIncomplete";
import { useGetAssignmentIncompleteCount } from "@/http/assignment/get-assignment-incomplete-count";
import { useGetAssignmentMissedCount } from "@/http/assignment/get-assignment-missed";
import { useGetAssignmentUpcomingCount } from "@/http/assignment/get-assignment-upcoming";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AssignmentContentDashboard() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      console.log("Authenticated, fetching data...");
    }
  }, [session.status]);

  const { data: incomplete, isPending: isPendingIncomplete } =
    useGetAssignmentIncompleteCount(session.data?.access_token as string, {
      enabled: session.status === "authenticated",
    });

  const { data: upcoming, isPending: isPendingUpcoming } =
    useGetAssignmentUpcomingCount(session.data?.access_token as string, {
      enabled: session.status === "authenticated",
    });

  const { data: missed, isPending: isPendingMissed } =
    useGetAssignmentMissedCount(session.data?.access_token as string, {
      enabled: session.status === "authenticated",
    });

  useEffect(() => {
    console.log("Incomplete:", incomplete);
    console.log("Upcoming:", upcoming);
    console.log("Missed:", missed);
  }, [incomplete, upcoming, missed]);

  return (
    <>
      {isPendingIncomplete && isPendingMissed && isPendingUpcoming ? (
        <CardCountSkeleton />
      ) : (
        <>
          <CardAssignment
            title="Tugas"
            description="Total tugas"
            data={Number(incomplete?.data)}
          />
          <CardAssignment
            title="Tugas"
            description="Tugas yang sudah terlewat"
            data={Number(missed?.data)}
          />
          <CardAssignment
            title="Tugas"
            description="Tugas mendatang"
            data={Number(upcoming?.data)}
          />
        </>
      )}
    </>
  );
}
