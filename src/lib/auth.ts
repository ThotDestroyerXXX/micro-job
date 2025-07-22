import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { admin, emailOTP, phoneNumber, username } from "better-auth/plugins";
import { sendEmail } from "@/lib/send-email";
import { EmailTemplate } from "@/components/email-template";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    username(),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, request) => {
        // Implement sending OTP code via SMS
      },
    }),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ otp, email }) {
        await sendEmail({
          to: email,
          subject: "Verify your email address",
          text: EmailTemplate({
            otpCode: otp,
          }),
        });
      },
    }),
    admin(),
  ],
});

export type Session = typeof auth.$Infer.Session;
