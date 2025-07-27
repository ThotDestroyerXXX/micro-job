import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../../config/job.config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectForm from "@/components/select-form";
import { jobCategories, jobType } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";

export default function BasicJobInformationSection({
  form,
}: Readonly<{
  form: UseFormReturn<JobFormData>;
}>) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-blue-600'>1</span>
            </div>
            Basic Information
          </CardTitle>
          <CardDescription>
            Provide the essential details about your job
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Deliver groceries to apartment'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Category *</FormLabel>
                  <SelectForm field={field} list={jobCategories.enumValues} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='job_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type *</FormLabel>
                  <SelectForm field={field} list={jobType.enumValues} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='workers_needed'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workers Needed</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='1'
                      placeholder='1'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='short_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description *</FormLabel>
                <FormControl>
                  <Input
                    placeholder='One-sentence summary for search previews'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will appear in search results and job listings
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Describe the job responsibilities, expectations, and any specific instructions...'
                    className='min-h-[120px] resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </section>
  );
}
