import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  UseFormReturn,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";
import { JobFormData } from "../../config/job.config";
import { dayEnum } from "@/db/schema";
import SelectForm from "@/components/select-form";

interface NonRecurringScheduleProps {
  form: UseFormReturn<JobFormData>;
  fields: FieldArrayWithId<JobFormData, "schedule", "id">[];
  append: UseFieldArrayAppend<JobFormData, "schedule">;
  remove: (index: number) => void;
}

export function NonRecurringSchedule({
  form,
  fields,
  append,
  remove,
}: Readonly<NonRecurringScheduleProps>) {
  return (
    <div className='space-y-4'>
      <Label className='text-base font-medium'>Schedule</Label>
      {fields.length === 0 && (
        <Button
          type='button'
          onClick={() =>
            append({
              day: "Monday",
              start_time: "09:00",
              end_time: "17:00",
            })
          }
          variant='outline'
          className='w-full'
        >
          <Plus className='h-4 w-4 mr-2' />
          Add Time Slot
        </Button>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className='border rounded-lg p-4'>
          <div className='flex items-center justify-between mb-3'>
            <Label className='text-sm font-medium'>Time Slot {index + 1}</Label>
            <Button
              type='button'
              onClick={() => remove(index)}
              variant='ghost'
              size='sm'
            >
              <Trash className='h-4 w-4' />
            </Button>
          </div>

          <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1'>
            <FormField
              control={form.control}
              name={`schedule.${index}.day` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <SelectForm field={field} list={dayEnum.enumValues} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`schedule.${index}.start_time` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='time'
                      step='60'
                      className='bg-background'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`schedule.${index}.end_time` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='time'
                      step='60'
                      className='bg-background'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
