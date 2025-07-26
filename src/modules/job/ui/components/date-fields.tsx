import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../config/job.config";
import { formatDateShort } from "@/lib/utils";

interface DateFieldsProps {
  form: UseFormReturn<JobFormData>;
}

export function DateFields({ form }: Readonly<DateFieldsProps>) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <FormField
        control={form.control}
        name='start_date'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Start Date *</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal bg-transparent'
                  >
                    <Calendar className='mr-2 h-4 w-4' />
                    {field.value ? formatDateShort(field.value) : "Select date"}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComponent
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date: Date) => date < new Date()}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='end_date'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>End Date / Deadline</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal bg-transparent'
                  >
                    <Calendar className='mr-2 h-4 w-4' />
                    {field.value ? formatDateShort(field.value) : "Select date"}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComponent
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date: Date) => date < new Date()}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
