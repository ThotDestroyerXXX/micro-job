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
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../config/job.config";
import { paymentType, preferredPaymentMethod } from "@/db/schema";

export default function PaymentBudgetSection({
  form,
}: Readonly<{
  form: UseFormReturn<JobFormData>;
}>) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-orange-600'>4</span>
            </div>
            Payment & Budget
          </CardTitle>
          <CardDescription>
            Set your budget and payment preferences
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='pay_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select payment type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentType.enumValues.map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className='flex items-center gap-2'>
                            <DollarSign className='h-4 w-4' />
                            {type}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='pay_amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Budget Amount *{" "}
                    {form.watch("pay_type") === "Hourly"
                      ? "(per hour)"
                      : "(total)"}
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                      <Input
                        type='number'
                        step='0.01'
                        min='0'
                        placeholder='0.00'
                        className='pl-10'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='preferred_payment_method'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Payment Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select payment method' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {preferredPaymentMethod.enumValues.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </section>
  );
}
