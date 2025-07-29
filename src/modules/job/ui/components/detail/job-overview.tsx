"use client";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Globe, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDateShort } from "@/lib/utils";

export default function JobOverview({
  detailedDescription,
  expirationDate,
}: Readonly<{
  detailedDescription: string | null;
  expirationDate: string | null;
}>) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  return (
    <TabsContent value='overview' className='space-y-6'>
      {/* Job Description */}
      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          Detailed Description
        </h3>
        <div className='prose prose-gray max-w-none'>
          <div
            className={`text-gray-700 leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}
          >
            {detailedDescription?.split("\n").map((paragraph, index) => (
              <p
                key={`${paragraph}-${index}`}
                className='mb-4 whitespace-pre-line break-all'
              >
                {paragraph}
              </p>
            ))}
          </div>
          {!showFullDescription && (
            <Button
              variant='ghost'
              onClick={() => setShowFullDescription(true)}
              className='text-blue-600 hover:text-blue-700 p-0 h-auto font-medium'
            >
              Read more...
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Job Visibility Settings */}
      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          Job Settings
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex items-center gap-3 p-4 bg-blue-50 rounded-lg'>
            <Globe className='h-6 w-6 text-blue-600' />
            <div>
              <div className='font-medium text-blue-900'>Public Posting</div>
              <div className='text-sm text-blue-700'>
                Visible to all workers
              </div>
            </div>
          </div>
          <div className='flex items-center gap-3 p-4 bg-orange-50 rounded-lg'>
            <AlertCircle className='h-6 w-6 text-orange-600' />
            <div>
              <div className='font-medium text-orange-900'>Expires</div>
              <div className='text-sm text-orange-700'>
                {formatDateShort(expirationDate ?? "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
