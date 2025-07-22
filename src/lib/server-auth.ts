"use server";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function signUp({
  name,
  email,
  password,
  image,
  username,
  displayUsername,
}: {
  name: string;
  email: string;
  password: string;
  image?: string;
  username: string;
  displayUsername?: string;
}) {
  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      image,
      username,
      displayUsername,
      rememberMe: true,
    },
  });

  return response;
}

export async function sendVerificationOTP() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "No session found" };
    }

    await auth.api.sendVerificationOTP({
      body: {
        email: session.user.email,
        type: "email-verification",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send OTP",
    };
  }
}

export async function verifyOTP(email: string, otp: string) {
  const data = await auth.api.verifyEmailOTP({
    body: {
      email: email,
      otp: otp,
    },
    asResponse: true,
  });
  const response = await data.json();

  return response;
}
