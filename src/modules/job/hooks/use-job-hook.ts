import { zodResolver } from "@hookform/resolvers/zod";
import { JobFormData, jobSchema } from "../config/job.config";
import { useForm } from "react-hook-form";
import {
  experienceLevel,
  jobCategories,
  jobType,
  locationType,
  paymentType,
  preferredPaymentMethod,
} from "@/db/schema";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useJobForm() {
  const utils = trpc.useUtils();
  const router = useRouter();
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      category: jobCategories.enumValues[0],
      job_type: jobType.enumValues[0],
      short_description: "",
      description: "",
      location_type: locationType.enumValues[0],
      address: "",
      latitude: 0,
      longitude: 0,
      start_date: new Date(),
      end_date: new Date(),
      schedule: [],
      required_skills: [],
      experience_level: experienceLevel.enumValues[0],
      requirements: "",
      pay_amount: 0,
      pay_type: paymentType.enumValues[0],
      preferred_payment_method: preferredPaymentMethod.enumValues[0],
      workers_needed: 1,
      is_visible: true,
      expires_at: new Date(),
      is_active: true,
    },
  });

  const { mutateAsync } = trpc.job.createJob.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.invalidate();
      toast.success("Job created successfully");
      router.push("/");
    },
    onError: (error) => {
      console.error("Failed to create job:", error);
      toast.error("Failed to create job");
    },
  });

  const onSubmit = async (values: JobFormData) => {
    try {
      const imageName = values.image?.name || "";
      await mutateAsync({
        ...values,
        image: imageName,
      });

      console.log("Job created successfully:", values);
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
}
