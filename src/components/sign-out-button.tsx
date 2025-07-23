"use client";
import { signOut } from "@/lib/server-auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { VariantProps } from "class-variance-authority";

export default function SignOutButton({
  className,
  variant,
}: Readonly<{
  className?: string;
  variant?: VariantProps<typeof Button>["variant"];
}>) {
  return (
    <Button
      onClick={async () => await signOut()}
      className={className}
      variant={variant}
    >
      <LogOut />
      Sign Out
    </Button>
  );
}
