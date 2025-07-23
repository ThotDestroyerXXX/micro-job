import { HydrateClient, trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";
import ProfileView from "@/modules/profile/ui/views/profile-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return redirect("/");
  }

  void trpc.profile.getUserAvailability.prefetch({
    userId: user.user.id,
  });

  return (
    <HydrateClient>
      <ProfileView user={user.user} />
    </HydrateClient>
  );
}
