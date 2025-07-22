import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  className = "w-full max-w-2xl",
}: Readonly<AuthCardProps>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {(footerText || footerLinkText) && (
        <CardFooter className='flex-col gap-4'>
          <CardAction className='text-center w-full'>
            {footerText}{" "}
            {footerLinkText && footerLinkHref && (
              <Link href={footerLinkHref} className='text-blue-500'>
                {footerLinkText}
              </Link>
            )}
          </CardAction>
        </CardFooter>
      )}
    </Card>
  );
}
