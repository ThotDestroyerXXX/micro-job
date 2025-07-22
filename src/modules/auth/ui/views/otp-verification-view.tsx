"use client";

import { useEffect, useState } from "react";
import { sendVerificationOTP } from "@/lib/server-auth";
import { toast } from "sonner";
import OTPSection from "../sections/otp-section";
import OTPVerificationSkeleton from "../components/otp-skeleton";
import { Button } from "@/components/ui/button";

interface OTPVerificationViewProps {
  userEmail: string;
}

export default function OTPVerificationView({
  userEmail,
}: Readonly<OTPVerificationViewProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Send OTP when component mounts
    const sendOTP = async () => {
      setIsLoading(true);

      try {
        const result = await sendVerificationOTP();

        if (result.success) {
          toast.success("Verification code sent to your email!");
          setCanResend(true);
        } else {
          toast.error(result.error || "Failed to send verification code");
        }
      } catch (error) {
        console.error("Failed to send verification code:", error);
        toast.error("Failed to send verification code");
      } finally {
        setIsLoading(false);
      }
    };

    sendOTP();
  }, []);

  const handleResendOTP = async () => {
    setCanResend(false);
    setIsLoading(true);
    const result = await sendVerificationOTP();

    if (result.success) {
      toast.success("Verification code resent!");
    } else {
      toast.error("Failed to resend code");
    }
    setIsLoading(false);

    // Allow resend again after 30 seconds
    setTimeout(() => setCanResend(true), 30000);
  };

  return (
    <>
      {isLoading ? (
        <OTPVerificationSkeleton />
      ) : (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>
          <h1>OTP Verification</h1>
          <p>
            Please enter the OTP sent to your registered email or phone number.
          </p>
          <OTPSection email={userEmail} />
          {canResend ? (
            <p>
              Didn&apos;t receive the code?
              <Button
                onClick={handleResendOTP}
                className='text-blue-600 hover:underline text-sm'
                variant={"link"}
                size={"sm"}
              >
                Resend
              </Button>
            </p>
          ) : (
            <p className='text-gray-500 text-sm'>
              Resend available in 30 seconds
            </p>
          )}
        </div>
      )}
    </>
  );
}
