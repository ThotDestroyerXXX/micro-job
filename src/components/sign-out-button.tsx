"use client";
import { signOut } from "@/lib/server-auth";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return <Button onClick={async () => await signOut()}>Sign Out</Button>;
}
