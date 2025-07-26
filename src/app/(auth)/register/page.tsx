import RegisterView from "@/modules/auth/ui/views/register-view";
import { HydrateClient } from "@/trpc/server";

const Page = () => {
  return (
    <HydrateClient>
      <RegisterView />
    </HydrateClient>
  );
};

export default Page;
