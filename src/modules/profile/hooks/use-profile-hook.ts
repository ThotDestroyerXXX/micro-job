import { dayEnum } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BasicInformationFormData,
  basicInformationSchema,
} from "../config/profile.config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useChangeAcceptingJobs({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const { mutate } = trpc.profile.changeAccepting.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async () => {
      toast.success("Successfully changed accepting jobs status");
      router.refresh();
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      toast.error("Failed to change accepting jobs status");
      console.error("Failed to change accepting jobs status:", error);
    },
  });

  const changeAcceptingJobs = (userId: string, isAcceptingJobs: boolean) => {
    mutate({ userId, isAcceptingJobs });
  };

  return { changeAcceptingJobs };
}

export function useUpdateUserAvailability({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) {
  const utils = trpc.useUtils();
  const { mutate } = trpc.profile.updateUserAvailability.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async () => {
      toast.success("Availability updated successfully");
      await utils.invalidate();
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      toast.error("Failed to update availability");
      console.error("Failed to update availability:", error);
    },
  });

  const updateUserAvailability = (availability: {
    userId: string;
    dayOfWeek: (typeof dayEnum.enumValues)[number];
    isBusy: boolean;
  }) => {
    mutate(availability);
  };

  return { updateUserAvailability };
}

export function useUpdateUserProfile({
  setIsEditingProfile,
}: {
  setIsEditingProfile: (isEditing: boolean) => void;
}) {
  const form = useForm<BasicInformationFormData>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
      location: "",
    },
  });
  const utils = trpc.useUtils();
  const router = useRouter();
  const { mutateAsync } = trpc.profile.updateUserProfile.useMutation({
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await utils.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to update profile");
      console.error("Failed to update profile:", error);
    },
  });

  const onSubmit = async (values: BasicInformationFormData, userId: string) => {
    try {
      const { firstName, lastName, username, bio, location } = values;
      await mutateAsync({
        userId,
        name: firstName + " " + lastName,
        username,
        bio,
        location,
      });
      setIsEditingProfile(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to update profile: " + error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
}
