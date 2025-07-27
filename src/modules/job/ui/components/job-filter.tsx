"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import FilterContent from "./filter-content";

export default function JobFilter({
  selectedCategory,
  setSelectedCategory,
  selectedJobType,
  setSelectedJobType,
  selectedLocation,
  setSelectedLocation,
  payRange,
  setPayRange,
}: Readonly<{
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedJobType: string;
  setSelectedJobType: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  payRange: [number, number];
  setPayRange: (value: [number, number]) => void;
}>) {
  return (
    <div className='hidden lg:block w-80 shrink-0'>
      <Card className='sticky top-24 shadow-lg border-0 bg-white/90 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg'>
            <Filter className='h-5 w-5 text-blue-600' />
            Refine Your Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterContent
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedJobType={selectedJobType}
            setSelectedJobType={setSelectedJobType}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            payRange={payRange}
            setPayRange={setPayRange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
