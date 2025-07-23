import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
  LoginFormData,
  loginSchema,
} from "../config/auth-form.config";
import { signIn, signUp } from "@/lib/server-auth";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const useRegisterForm = () => {
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
      await signUp({
        name: firstName + " " + lastName,
        username: username,
        displayUsername: username, // Assuming displayUsername is the same as username
        email: email,
        password,
      });
    } catch (error) {
      // Don't show error if it's a redirect
      if (!isRedirectError(error)) {
        toast.error("Registration failed: " + getErrorMessage(error));
      }
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
};

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      const { username, password } = values;
      await signIn({
        username,
        password,
      });
    } catch (error) {
      // Don't show error if it's a redirect
      if (!isRedirectError(error)) {
        toast.error("Login failed: " + getErrorMessage(error));
      }
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
