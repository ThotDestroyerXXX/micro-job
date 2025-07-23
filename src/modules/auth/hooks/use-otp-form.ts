import { authClient } from "@/lib/auth-client";
import { verifyOTP } from "@/lib/server-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function useOTPForm() {
  const router = useRouter();
  const FormSchema = z.object({
    pin: z.string().min(6, "PIN must be at least 6 characters long"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const email = (await authClient.getSession()).data?.user.email;
    if (!email) {
      redirect("/register");
    }
    const response = await verifyOTP(email, data.pin);
    if (response.status) {
      router.push("/");
      toast.success("OTP verified successfully!");
      // Redirect or perform further actions after successful verification
    } else {
      toast.error("Failed to verify OTP");
    }
  }

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
}
