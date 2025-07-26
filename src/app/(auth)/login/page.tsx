import LoginView from "@/modules/auth/ui/views/login-view";
import { HydrateClient } from "@/trpc/server";

const Page = () => {
  return (
    <HydrateClient>
      <LoginView />
    </HydrateClient>
  );
};

export default Page;
