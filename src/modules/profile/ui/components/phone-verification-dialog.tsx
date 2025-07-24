"use client";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { usePhoneOTP } from "../../hooks/use-profile-hook";

export default function PhoneVerificationDialog() {
  const [otpCode, setOtpCode] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { handleSend, handleVerify } = usePhoneOTP(
    phoneNumber,
    setIsVerifying,
    setIsOtpSent
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-xs bg-transparent'>
          Verify
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Verify Phone Number</DialogTitle>
          <DialogDescription>
            {!isOtpSent
              ? "We'll send a verification code to your phone number"
              : "Enter the 6-digit code sent to your phone"}
          </DialogDescription>
        </DialogHeader>

        {!isOtpSent ? (
          <div className='space-y-4'>
            <div>
              <Label htmlFor='phone' className='text-sm font-medium'>
                Phone Number
              </Label>
              <Input
                id='phone'
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='+62 812-3456-7890'
                className='mt-1'
              />
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='text-center'>
              <div className='text-sm text-muted-foreground mb-4'>
                Code sent to {phoneNumber}
              </div>
              <div className='flex justify-center gap-2 mb-4'>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className='flex items-center justify-center gap-2 text-sm'>
                <span className='text-muted-foreground'>
                  Didn&apos;t receive code?
                </span>
                <Button
                  onClick={async () => {
                    await handleSend(setOtpTimer, setCanResendOtp);
                  }}
                  variant={"link"}
                  disabled={!canResendOtp}
                  className={`font-medium ${
                    canResendOtp
                      ? "text-blue-600 hover:text-blue-700 cursor-pointer"
                      : "text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {canResendOtp ? "Resend" : `Resend in ${otpTimer}s`}
                </Button>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => setIsOtpSent(false)}
            disabled={isVerifying}
          >
            Back
          </Button>
          {!isOtpSent ? (
            <Button
              onClick={async () => {
                await handleSend(setOtpTimer, setCanResendOtp);
              }}
              disabled={isVerifying || !phoneNumber.trim()}
            >
              {isVerifying ? "Sending..." : "Send Code"}
            </Button>
          ) : (
            <Button
              onClick={async () => await handleVerify(otpCode)}
              disabled={isVerifying || otpCode.length !== 6}
            >
              {isVerifying && canResendOtp ? "Verifying..." : "Verify"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
