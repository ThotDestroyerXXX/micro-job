import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../config/job.config";
import { locationType } from "@/db/schema";
import SelectForm from "@/components/select-form";

interface LocationFieldsProps {
  form: UseFormReturn<JobFormData>;
  locationType: string;
}

export function LocationFields({
  form,
  locationType: typeLocation,
}: Readonly<LocationFieldsProps>) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <FormField
        control={form.control}
        name='location_type'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Type *</FormLabel>
            <SelectForm field={field} list={locationType.enumValues} />
            <FormMessage />
          </FormItem>
        )}
      />

      {typeLocation === "on-site" && (
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Address *</FormLabel>
              <FormControl>
                <Input placeholder='Enter full address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
