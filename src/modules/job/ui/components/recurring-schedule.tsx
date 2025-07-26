import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  UseFormReturn,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";
import { JobFormData } from "../../config/job.config";
import { dayEnum } from "@/db/schema";

interface RecurringScheduleProps {
  form: UseFormReturn<JobFormData>;
  fields: FieldArrayWithId<JobFormData, "schedule", "id">[];
  append: UseFieldArrayAppend<JobFormData, "schedule">;
  remove: (index: number) => void;
}

export function RecurringSchedule({
  form,
  fields,
  append,
  remove,
}: Readonly<RecurringScheduleProps>) {
  const handleSetWeekdays = () => {
    // Clear existing schedule
    const currentLength = fields.length;
    for (let i = currentLength - 1; i >= 0; i--) {
      remove(i);
    }

    // Add weekdays (Monday to Friday)
    const weekdays = dayEnum.enumValues.slice(0, 5);
    weekdays.forEach((day) => {
      append({ day, start_time: "09:00", end_time: "17:00" });
    });
  };

  const handleClearAll = () => {
    // Clear all schedule items
    const currentLength = fields.length;
    for (let i = currentLength - 1; i >= 0; i--) {
      remove(i);
    }
  };

  return (
    <div className='space-y-4'>
      <Label className='text-base font-medium'>Weekly Schedule</Label>
      <div className='space-y-3'>
        {dayEnum.enumValues.map((day) => {
          const scheduleIndex = fields.findIndex(
            (field, index) => form.getValues(`schedule.${index}.day`) === day
          );
          const isEnabled = scheduleIndex !== -1;

          return (
            <div key={day} className='border rounded-lg p-4'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center space-x-3'>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => {
                      if (checked && scheduleIndex === -1) {
                        append({
                          day,
                          start_time: "09:00",
                          end_time: "17:00",
                        });
                      } else if (!checked && scheduleIndex !== -1) {
                        remove(scheduleIndex);
                      }
                    }}
                  />
                  <Label className='text-sm font-medium capitalize'>
                    {day}
                  </Label>
                </div>
                {isEnabled && scheduleIndex !== -1 && (
                  <div className='text-xs text-muted-foreground'>
                    {form.getValues(`schedule.${scheduleIndex}.start_time`)} -{" "}
                    {form.getValues(`schedule.${scheduleIndex}.end_time`)}
                  </div>
                )}
              </div>

              {isEnabled && scheduleIndex !== -1 && (
                <div className='grid grid-cols-2 gap-3'>
                  <FormField
                    control={form.control}
                    name={`schedule.${scheduleIndex}.start_time` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs'>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='time'
                            className='h-8 text-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`schedule.${scheduleIndex}.end_time` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs'>End Time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='time'
                            className='h-8 text-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions for Recurring Schedule */}
      <div className='flex gap-2 pt-2'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleSetWeekdays}
          className='text-xs'
        >
          Set Weekdays (9-5)
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleClearAll}
          className='text-xs'
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
