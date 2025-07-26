import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../config/job.config";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function JobAttachmentSection({
  form,
}: Readonly<{
  form: UseFormReturn<JobFormData>;
}>) {
  const imageFile = form.watch("image");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    form.setValue("image", files);
  };

  const handleRemoveAttachment = () => {
    form.setValue("image", undefined);
  };
  return (
    <section className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-gray-600'>6</span>
            </div>
            Attachments
          </CardTitle>
          <CardDescription>
            Upload images, documents, or files related to the job (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {!imageFile ? (
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
              <Upload className='mx-auto h-12 w-12 text-gray-400 mb-4' />
              <div className='space-y-2'>
                <p className='text-sm font-medium'>Upload files</p>
                <p className='text-xs text-muted-foreground'>
                  Drag and drop files here, or click to browse
                </p>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={handleFileUpload}
                  className='hidden'
                  id='file-upload'
                />
                <Button variant='outline' size='sm' asChild>
                  <label htmlFor='file-upload' className='cursor-pointer'>
                    Choose Files
                  </label>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className='flex gap-6 justify-between flex-col'>
                  <Button
                    type='button'
                    variant='destructive'
                    size='lg'
                    onClick={handleRemoveAttachment}
                    className=' p-2 mt-2'
                  >
                    Cancel
                  </Button>
                  <Image
                    src={URL.createObjectURL(imageFile as File)}
                    alt='Uploaded file'
                    width={600}
                    height={600}
                    className='size-full max-h-[36rem] object-cover rounded-lg'
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
