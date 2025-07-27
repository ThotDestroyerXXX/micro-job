"use client";
import { Form } from "@/components/ui/form";
import CreateJobHeader from "../sections/create/create-job-header";
import { useJobForm } from "../../hooks/use-job-hook";
import BasicJobInformationSection from "../sections/create/basic-job-information-section";
import SkillRequirementSection from "../sections/create/skill-requirement-section";
import LocationTimeSection from "../sections/create/location-time-section";
import PaymentBudgetSection from "../sections/create/payment-budget-section";
import JobVisibilitySection from "../sections/create/job-visibility-section";
import JobAttachmentSection from "../sections/create/job-attachment-section";
import CreateJobFooter from "../sections/create/create-job-footer";

export default function CreateJobView() {
  const { form, onSubmit, isLoading } = useJobForm();
  return (
    <Form {...form}>
      <form className='space-y-6 p-6' onSubmit={form.handleSubmit(onSubmit)}>
        <CreateJobHeader />
        <BasicJobInformationSection form={form} />
        <SkillRequirementSection form={form} />
        <LocationTimeSection form={form} />
        <PaymentBudgetSection form={form} />
        <JobVisibilitySection form={form} />
        <JobAttachmentSection form={form} />
        <CreateJobFooter isSubmitting={isLoading} />
      </form>
    </Form>
  );
}
