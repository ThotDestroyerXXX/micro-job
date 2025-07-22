import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "../config/register-form.config";
import { signUp } from "@/lib/server-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

export const useRegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      const { firstName, lastName, username, email, password } = values;
      const response = await signUp({
        name: firstName + " " + lastName,
        username: username,
        displayUsername: username, // Assuming displayUsername is the same as username
        email: email,
        password,
      });

      console.log(response);

      if (response) {
        router.push("/otp-verification");
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed: " + getErrorMessage(error));
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
