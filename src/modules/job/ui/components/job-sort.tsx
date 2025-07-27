"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jobSortOptions } from "@/constant";

export default function JobSort({
  sortBy,
  setSortBy,
}: Readonly<{
  sortBy: string;
  setSortBy: (value: string) => void;
}>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='bg-white shadow-sm'>
          Sort by
          <ChevronDown className='h-4 w-4 ml-2' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-56' align='start'>
        <div className='space-y-2'>
          {jobSortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? "default" : "ghost"}
              className='w-full justify-start text-left p-3 h-auto'
              onClick={() => setSortBy(option.value)}
            >
              <div>
                <div className='font-medium'>{option.label}</div>
                <div className='text-xs'>{option.desc}</div>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
