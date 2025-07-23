import {
  adminClient,
  emailOTPClient,
  inferAdditionalFields,
  phoneNumberClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin as administrator, user } from "@/lib/permission";
import { auth } from "./auth";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    phoneNumberClient(),
    emailOTPClient(),
    adminClient({
      ac,
      roles: {
        admin: administrator,
        user: user,
      },
    }),
  ],
});
