"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { jobCategories, jobType, locationType } from "@/db/schema";

export default function FilterContent({
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
  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedJobType("All Types");
    setSelectedLocation("All Locations");
    setPayRange([0, 10000]);
  };
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='font-semibold mb-3'>Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All Categories'>All Categories</SelectItem>
            {jobCategories.enumValues.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className='font-semibold mb-3'>Job Type</h3>
        <Select value={selectedJobType} onValueChange={setSelectedJobType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All Types'>All Types</SelectItem>
            {jobType.enumValues.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className='font-semibold mb-3'>Location</h3>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All Locations'>All Locations</SelectItem>
            {locationType.enumValues.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className='font-semibold mb-3'>Pay Range</h3>
        <div className='px-2'>
          <Slider
            value={payRange}
            onValueChange={setPayRange}
            max={10000}
            min={0}
            step={10}
            className='mb-2'
          />
          <div className='flex justify-between text-sm text-muted-foreground'>
            <span>$ {payRange[0].toString()}</span>
            <span>$ {payRange[1].toString()}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={clearFilters}
        variant='outline'
        className='w-full bg-transparent'
      >
        Clear All Filters
      </Button>
    </div>
  );
}
