import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mail, CheckCircle, Phone } from "lucide-react";
import PhoneVerificationDialog from "../components/phone-verification-dialog";

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
        <div className='flex items-center gap-3'>
          <Mail className='h-4 w-4 text-muted-foreground' />
          <span>{email}</span>
          {emailVerified ? (
            <CheckCircle className='h-4 w-4 text-green-500' />
          ) : (
            <span className='text-red-500'>Not Verified</span>
          )}
        </div>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <Phone className='h-4 w-4 text-muted-foreground' />
            <span>{phone}</span>
            {phoneVerified ? (
              <CheckCircle className='h-4 w-4 text-green-500' />
            ) : (
              <div className='flex items-center gap-2 '>
                <div className='h-4 w-4 rounded-full border-2 border-orange-500 flex items-center justify-center'>
                  <div className='h-1.5 w-1.5 bg-orange-500 rounded-full' />
                </div>
                <span className='text-xs text-orange-600'>Unverified</span>
              </div>
            )}
          </div>
          {!phoneVerified && (
            <div className='flex items-center'>
              <PhoneVerificationDialog />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
