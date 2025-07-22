import { HydrateClient } from "@/app/trpc/server";
import { auth } from "@/lib/auth";
import transporter from "@/lib/nodemailer";
import OTPVerificationView from "@/modules/auth/ui/views/otp-verification-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const OTPVerification = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  await transporter.verify();

  if (!session) {
    redirect("/register");
  } else if (session.user.emailVerified) {
    redirect("/");
  }

  return (
    <HydrateClient>
      <OTPVerificationView userEmail={session.user.email} />
    </HydrateClient>
  );
};

export default OTPVerification;
