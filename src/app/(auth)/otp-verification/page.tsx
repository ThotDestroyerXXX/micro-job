import { HydrateClient } from "@/trpc/server";
import transporter from "@/lib/nodemailer";
import { sendVerificationOTP } from "@/lib/server-auth";
import OTPVerificationView from "@/modules/auth/ui/views/otp-verification-view";

const Page = async () => {
  await transporter.verify();

  await sendVerificationOTP();

  return (
    <HydrateClient>
      <OTPVerificationView />
    </HydrateClient>
  );
};

export default Page;
