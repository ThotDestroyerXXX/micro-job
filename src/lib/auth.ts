import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { admin, emailOTP, phoneNumber, username } from "better-auth/plugins";
import { sendEmail } from "@/lib/send-email";
import { EmailTemplate } from "@/components/email-template";
import { nextCookies } from "better-auth/next-js";
import { ac, admin as administrator, user } from "@/lib/permission";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
      },
      rating: {
        type: "number",
        required: false,
        default: 0,
      },
      location: {
        type: "string",
        required: false,
      },
      latitude: {
        type: "number",
        required: false,
      },
      longitude: {
        type: "number",
        required: false,
      },
      isAcceptingJobs: {
        type: "boolean",
        required: false,
        default: true,
      },
    },
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
    admin({
      ac,
      roles: {
        admin: administrator,
        user: user,
      },
      defaultRole: "user",
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
