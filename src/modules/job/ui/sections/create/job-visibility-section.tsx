import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../../config/job.config";
import { formatDateShort } from "@/lib/utils";

export default function JobVisibilitySection({
  form,
}: Readonly<{
  form: UseFormReturn<JobFormData>;
}>) {
  return (
    <section className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-red-600'>5</span>
            </div>
            Job Visibility & Settings
          </CardTitle>
          <CardDescription>
            Control who can see and apply to your job
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <FormField
            control={form.control}
            name='is_visible'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Post Publicly</FormLabel>
                  <FormDescription>
                    Make this job visible on the public job board for all
                    workers to see
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name='expires_at'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Apply Deadline Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className='w-full justify-start text-left font-normal bg-transparent'
                      >
                        <Calendar className='mr-2 h-4 w-4' />
                        {field.value
                          ? formatDateShort(field.value)
                          : "Select date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <CalendarComponent
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The job will automatically close after this date if not filled
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </section>
  );
}
