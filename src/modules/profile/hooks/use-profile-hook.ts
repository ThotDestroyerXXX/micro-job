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
import { useCallback, useState } from "react";
import { sendPhoneVerificationOTP, verifyPhoneOTP } from "@/lib/server-auth";

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

  const changeAcceptingJobs = (isAcceptingJobs: boolean) => {
    mutate({ isAcceptingJobs });
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

  const onSubmit = async (values: BasicInformationFormData) => {
    try {
      const { firstName, lastName, username, bio, location } = values;
      await mutateAsync({
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

interface Skill {
  name: string;
  years: number;
}

interface UseSkillsManagementProps {
  initialSkills: Skill[];
}

export function useSkillsManagement({
  initialSkills,
}: UseSkillsManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Skill>({ name: "", years: 1 });
  const [isSaving, setIsSaving] = useState(false);

  const utils = trpc.useUtils();
  const router = useRouter();
  const { mutateAsync } = trpc.profile.updateUserSkills.useMutation({
    onSuccess: async () => {
      toast.success("Skills updated successfully");
      await utils.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to update skills");
      console.error("Failed to update skills:", error);
    },
  });

  const handleEdit = useCallback(() => {
    setEditSkills([...initialSkills]);
    setIsEditing(true);
  }, [initialSkills]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditSkills([]);
    setNewSkill({ name: "", years: 1 });
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await mutateAsync({ skills: editSkills });
      setIsEditing(false);
      setNewSkill({ name: "", years: 1 });
    } catch (error) {
      console.error("Failed to save skills:", error);
      // You might want to show a toast notification here
    } finally {
      setIsSaving(false);
    }
  }, [editSkills, mutateAsync]);

  const handleAddSkill = useCallback(() => {
    if (
      newSkill.name.trim() &&
      !editSkills.some(
        (skill) =>
          skill.name.toLowerCase() === newSkill.name.trim().toLowerCase()
      )
    ) {
      setEditSkills((prev) => [
        ...prev,
        { ...newSkill, name: newSkill.name.trim() },
      ]);
      setNewSkill({ name: "", years: 1 });
    }
  }, [newSkill, editSkills]);

  const handleRemoveSkill = useCallback((skillToRemove: string) => {
    setEditSkills((prev) =>
      prev.filter((skill) => skill.name !== skillToRemove)
    );
  }, []);

  const handleUpdateSkillYears = useCallback(
    (skillName: string, years: number) => {
      setEditSkills((prev) =>
        prev.map((skill) =>
          skill.name === skillName ? { ...skill, years } : skill
        )
      );
    },
    []
  );

  const handleNewSkillChange = useCallback((skill: Skill) => {
    setNewSkill(skill);
  }, []);

  return {
    isEditing,
    editSkills,
    newSkill,
    isSaving,
    handleEdit,
    handleCancel,
    handleSave,
    handleAddSkill,
    handleRemoveSkill,
    handleUpdateSkillYears,
    handleNewSkillChange,
  };
}

export function usePhoneOTP(
  phoneNumber: string,
  setIsVerifying: (isVerifying: boolean) => void,
  setIsOtpSent: (isSent: boolean) => void
) {
  const handleSend = async (
    setOtpTimer: React.Dispatch<React.SetStateAction<number>>,
    setCanResendOtp: (canResend: boolean) => void
  ) => {
    setIsVerifying(true);

    try {
      const data = await sendPhoneVerificationOTP(phoneNumber);

      setIsOtpSent(true);
      setOtpTimer(60);
      setCanResendOtp(false);
      const timer = setInterval(() => {
        setOtpTimer((prev: number) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return data;
    } catch (error) {
      // toast.error("Invalid OTP code")
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerify = async (otp: string) => {
    setIsVerifying(true);

    try {
      const data = await verifyPhoneOTP(phoneNumber, otp);

      setIsVerifying(false);
      setIsOtpSent(false);

      return data;
    } catch (error) {
      // toast.error("Invalid OTP code")
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return { handleSend, handleVerify };
}
