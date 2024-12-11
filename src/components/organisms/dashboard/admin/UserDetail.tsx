"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetDetailUser } from "@/http/admin/users/get-detail-user";
import { useSession } from "next-auth/react";
import PhotoProfile from "../../settings/PhotoProfile";

interface Props {
  id: number;
}

export default function UserDetail({ id }: Props) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailUser(
    {
      token: session?.access_token as string,
      id,
    },
    { enabled: status === "authenticated" }
  );

  return (
    <div className="my-8">
      <Card>
        <CardContent>
          <CardHeader>
            <div>
              <div className="flex items-center gap-4">
                <PhotoProfile session={session!} />
                <div className="space-y-2">
                  <h1 className="md:text-xl font-bold text-md">
                    {data?.data?.name}
                  </h1>
                  <p className="text-muted-foreground">{data?.data?.email}</p>
                </div>
                <div
                  data-orientation="vertical"
                  role="none"
                  className="shrink-0 bg-border w-[10px] h-30"
                ></div>
              </div>
            </div>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}
