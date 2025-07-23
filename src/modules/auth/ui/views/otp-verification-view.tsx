"use client";

import { useState } from "react";
import { sendVerificationOTP } from "@/lib/server-auth";
import { toast } from "sonner";
import OTPSection from "../sections/otp-section";
import OTPVerificationSkeleton from "../components/otp-skeleton";
import { Button } from "@/components/ui/button";

export default function OTPVerificationView() {
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);

  const handleSendOTP = async () => {
    setIsLoading(true);
    setCanResend(false);

    try {
      const result = await sendVerificationOTP();

      if (result.success) {
        toast.success("Verification code sent to your email!");
      } else {
        toast.error(result.error || "Failed to send verification code");
      }
    } catch (error) {
      console.error("Failed to send verification code:", error);
      toast.error("Failed to send verification code");
    } finally {
      setIsLoading(false);
    }

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
          <OTPSection />
          {canResend ? (
            <p>
              Didn&apos;t receive the code?
              <Button
                onClick={handleSendOTP}
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
