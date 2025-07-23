"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "../components/form-field-wrapper";
import { AuthCard } from "../components/auth-card";
import { useLoginForm } from "../../hooks/use-auth-form";
import { LOGIN_FORM_FIELDS } from "../../config/auth-form.config";

export default function LoginForm() {
  const { form, onSubmit, isLoading } = useLoginForm();

  return (
    <AuthCard
      title='Login'
      description='Login now to start using our services and join our community.'
      footerText="Don't have an account?"
      footerLinkText='Register'
      footerLinkHref='/register'
      className='w-full max-w-md'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            {LOGIN_FORM_FIELDS.map((field) => (
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
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
