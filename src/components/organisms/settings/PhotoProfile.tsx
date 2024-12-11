import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateFallbackFromName } from "@/utils/misc";
import { Session } from "next-auth";

interface PhotoProfileProps {
  session: Session;
}

export default function PhotoProfile({ session }: PhotoProfileProps) {
  return (
    <>
      <Avatar className="aspect-square h-full max-h-32 w-full max-w-32 border border-muted">
        <AvatarFallback className="text-3xl font-bold md:text-5xl">
          {generateFallbackFromName(session.user.name)}
        </AvatarFallback>
      </Avatar>
    </>
  );
}
