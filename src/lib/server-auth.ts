"use server";
import { redirect } from "next/navigation";
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
    asResponse: true,
  });

  if (response.ok) {
    return redirect("/otp-verification");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to sign in");
  }
}

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await auth.api.signInUsername({
    body: {
      username,
      password,
      rememberMe: true,
    },
    asResponse: true,
  });

  if (response.ok) {
    return redirect("/");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to sign in");
  }
}

export async function signOut() {
  const response = await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  if (response.success) {
    return redirect("/login");
  }
}

export async function sendVerificationOTP() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/register");
    } else if (session.user.emailVerified) {
      redirect("/");
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
