import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mail, CheckCircle, Phone } from "lucide-react";
import PhoneVerificationDialog from "../components/phone-verification-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactInfoSection({
  email,
  phone,
  emailVerified,
  phoneVerified,
}: Readonly<{
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Mail className='h-5 w-5' />
          Contact Information
        </CardTitle>
        <CardDescription>
          This information is private and only shared after job confirmation
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-start min-[420px]:items-center min-[420px]:gap-3 flex-col min-[420px]:flex-row'>
          <div className='flex-row flex items-center gap-2'>
            <Mail className='h-4 w-4 text-muted-foreground shrink-0' />
            <span className='shrink-0'>{email}</span>
          </div>
          {emailVerified ? (
            <CheckCircle className='h-4 w-4 text-green-500 shrink-0' />
          ) : (
            <div className='flex items-center gap-2 justify-between w-full'>
              <div className='flex gap-2'>
                <div className='h-4 w-4 rounded-full border-2 border-orange-500 flex items-center justify-center'>
                  <div className='h-1.5 w-1.5 bg-orange-500 rounded-full' />
                </div>
                <span className='text-xs text-orange-600'>Unverified</span>
              </div>
              <div className='flex items-center'>
                <Link href={"/otp-verification"}>
                  <Button variant='outline' className='text-xs bg-transparent'>
                    Verify
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className='flex items-start min-[420px]:items-center min-[420px]:gap-3 flex-col min-[420px]:flex-row'>
          <div className='flex-row flex items-center gap-2'>
            <Phone className='h-4 w-4 text-muted-foreground shrink-0' />
            <span className='shrink-0'>{phone}</span>
          </div>
          {phoneVerified ? (
            <CheckCircle className='h-4 w-4 text-green-500 shrink-0' />
          ) : (
            <div className='flex items-center gap-2 justify-between flex-1 max-[420px]:w-full'>
              <div className='flex gap-2'>
                <div className='h-4 w-4 rounded-full border-2 border-orange-500 flex items-center justify-center'>
                  <div className='h-1.5 w-1.5 bg-orange-500 rounded-full' />
                </div>
                <span className='text-xs text-orange-600'>Unverified</span>
              </div>
              <div className='flex items-center'>
                <PhoneVerificationDialog />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
