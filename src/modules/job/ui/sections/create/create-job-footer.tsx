import { Button } from "@/components/ui/button";

export default function CreateJobFooter({
  isSubmitting,
}: Readonly<{
  isSubmitting: boolean;
}>) {
  return (
    <div className='flex justify-end gap-4 pb-8'>
      <Button type='button' variant='outline' size='lg'>
        Cancel
      </Button>
      <Button
        type='submit'
        disabled={isSubmitting}
        size='lg'
        className='min-w-[120px]'
      >
        {isSubmitting ? "Posting..." : "Post Job"}
      </Button>
    </div>
  );
}
