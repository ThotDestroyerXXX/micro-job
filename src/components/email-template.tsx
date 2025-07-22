import { Button, Heading, Section, Text } from "@react-email/components";
import { Layout } from "@/components/email-layout";

export const component = (otp: string) => (
  <Section className='text-center'>
    <Heading
      as='h1'
      className='text-[24px] font-semibold leading-[32px] text-gray-900'
    >
      Verify Your Email Address
    </Heading>
    <Text className='mt-[16px] text-[16px] leading-[24px] text-gray-500'>
      Thanks for signing up! To ensure your account security, please verify your
      email address using the OTP below:
    </Text>
    <Section className='mt-[32px]'>
      <Text className='text-[30px] font-bold leading-[40px] text-indigo-600'>
        {otp}
      </Text>
    </Section>
    <Text className='mt-[16px] text-[14px] leading-[20px] text-gray-500'>
      This OTP is valid for a short period. Please do not share it with anyone.
    </Text>
    <Button
      className='mt-[32px] rounded-[8px] bg-indigo-600 px-[20px] py-[12px] font-semibold text-white'
      href='#'
    >
      Verify Email
    </Button>
    <Text className='mt-[32px] text-[14px] leading-[20px] text-gray-500'>
      If you did not request this verification, please ignore this email.
    </Text>
  </Section>
);

export const EmailTemplate = ({ otpCode }: { otpCode: string }) => {
  return <Layout>{component(otpCode)}</Layout>;
};
