"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "../components/form-field-wrapper";
import { AuthCard } from "../components/auth-card";
import { useRegisterForm } from "../../hooks/use-register-form";
import { REGISTER_FORM_FIELDS } from "../../config/register-form.config";

export default function RegisterForm() {
  const { form, onSubmit, isLoading } = useRegisterForm();

  return (
    <AuthCard
      title='Register'
      description='Register now to start using our services and join our community.'
      footerText='Already have an account?'
      footerLinkText='Log in'
      footerLinkHref='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            {REGISTER_FORM_FIELDS.map((field) => (
              <FormFieldWrapper
                key={field.name}
                control={form.control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
              />
            ))}
            <Button
              type='submit'
              className='w-full col-span-2'
              size={"lg"}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
