import { zodResolver } from "@hookform/resolvers/zod";
import {
  JobApplicationData,
  jobApplicationSchema,
  JobFormData,
  jobSchema,
} from "../config/job.config";
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

export function useToggleSaveJob() {
  const utils = trpc.useUtils();

  const { mutateAsync } = trpc.job.toogleSaveJob.useMutation({
    onMutate: async ({ jobId }) => {
      // Cancel any outgoing refetches for both queries
      await utils.job.getAll.cancel();
      await utils.job.getOne.cancel();

      // Snapshot the previous values
      const previousJobs = utils.job.getAll.getData();
      const previousJob = utils.job.getOne.getData({ jobId });

      // Optimistically update the getAll cache
      utils.job.getAll.setData(undefined, (old) => {
        if (!old) return old;

        return old.map((item) => {
          if (item.job.id === jobId) {
            return {
              ...item,
              isSaved: !item.isSaved, // Toggle the saved state
            };
          }
          return item;
        });
      });

      // Optimistically update the getOne cache
      utils.job.getOne.setData({ jobId }, (old) => {
        if (!old) return old;

        return {
          ...old,
          isSaved: !old.isSaved, // Toggle the saved state
        };
      });

      return { previousJobs, previousJob };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousJobs) {
        utils.job.getAll.setData(undefined, context.previousJobs);
      }
      if (context?.previousJob) {
        utils.job.getOne.setData(
          { jobId: variables.jobId },
          context.previousJob
        );
      }
      console.error("Failed to save job:", error);
      toast.error("Failed to save job");
    },
    onSettled: () => {
      // Always refetch to ensure server state is in sync
      utils.job.invalidate();
    },
  });

  const toggleSaveJob = async (jobId: string) => {
    try {
      await mutateAsync({ jobId });
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return { toggleSaveJob };
}

// Alternative hook for when you know the specific jobId (useful for job detail pages)
export function useToggleSaveJobForDetail(jobId: string) {
  const utils = trpc.useUtils();

  const { mutateAsync, isPending } = trpc.job.toogleSaveJob.useMutation({
    onMutate: async () => {
      // Cancel any outgoing refetches for both queries
      await utils.job.getAll.cancel();
      await utils.job.getOne.cancel();

      // Snapshot the previous values
      const previousJobs = utils.job.getAll.getData();
      const previousJob = utils.job.getOne.getData({ jobId });

      // Optimistically update the getAll cache
      utils.job.getAll.setData(undefined, (old) => {
        if (!old) return old;

        return old.map((item) => {
          if (item.job.id === jobId) {
            return {
              ...item,
              isSaved: !item.isSaved,
            };
          }
          return item;
        });
      });

      // Optimistically update the getOne cache
      utils.job.getOne.setData({ jobId }, (old) => {
        if (!old) return old;

        return {
          ...old,
          isSaved: !old.isSaved,
        };
      });

      return { previousJobs, previousJob };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousJobs) {
        utils.job.getAll.setData(undefined, context.previousJobs);
      }
      if (context?.previousJob) {
        utils.job.getOne.setData({ jobId }, context.previousJob);
      }
      console.error("Failed to save job:", error);
      toast.error("Failed to save job");
    },
    onSettled: () => {
      // Always refetch to ensure server state is in sync
      utils.job.invalidate();
    },
  });

  const toggle = async () => {
    if (!jobId) {
      console.error("JobId is required");
      return;
    }
    try {
      await mutateAsync({ jobId });
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return { toggle, isPending };
}

export const useSubmitApplicationForm = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const form = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      coverLetter: "",
    },
  });

  const { mutateAsync } = trpc.job.applyToJob.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.invalidate();
      toast.success("Job application submitted successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Failed to apply to job:", error);
      toast.error("Failed to apply to job");
    },
  });

  const onSubmit = async (values: JobApplicationData, jobId: string) => {
    try {
      await mutateAsync({
        ...values,
        jobId,
      });

      console.log("Job applied successfully:", values);
    } catch (error) {
      console.error("Failed to apply to job:", error);
    }
  };

  return { form, onSubmit, isLoading: form.formState.isSubmitting };
};
