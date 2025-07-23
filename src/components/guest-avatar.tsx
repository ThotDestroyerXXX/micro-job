import { UserRound } from "lucide-react";

export default function GuestAvatar({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <UserRound
      className={`w-8 h-8 rounded-full border-3 border-black ${className}`}
    />
  );
}
