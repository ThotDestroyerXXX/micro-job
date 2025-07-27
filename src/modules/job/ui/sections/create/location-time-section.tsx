import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../../config/job.config";
import { LocationFields } from "../../components/location-fields";
import { DateFields } from "../../components/date-fields";
import { NonRecurringSchedule } from "../../components/non-recurring-schedule";
import { RecurringSchedule } from "../../components/recurring-schedule";

export default function LocationTimeSection({
  form,
}: Readonly<{
  form: UseFormReturn<JobFormData>;
}>) {
  const { fields, append, remove } = useFieldArray({
    name: "schedule",
    control: form.control,
  });

  const jobType = form.watch("job_type");
  const typeLocation = form.watch("location_type");

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-purple-600'>3</span>
            </div>
            Location & Time
          </CardTitle>
          <CardDescription>
            Set where and when the job needs to be done
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <LocationFields form={form} locationType={typeLocation} />

          <DateFields form={form} />

          {/* Time Selection for Non-Recurring Jobs */}
          {jobType !== "Recurring" && (
            <NonRecurringSchedule
              form={form}
              fields={fields}
              append={append}
              remove={remove}
            />
          )}

          {/* Weekly Schedule for Recurring Jobs */}
          {jobType === "Recurring" && (
            <RecurringSchedule
              form={form}
              fields={fields}
              append={append}
              remove={remove}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
