import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CATEGORY_OPTIONS } from "@/lib/job-category-gradients";
import { useCallback } from "react";
import { DebouncedState } from "use-debounce";

interface JobFiltersProps {
  selectedCategory: string;
  sortBy: string;
  onSearchChange: DebouncedState<(value: string) => void>;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function JobFilters({
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: Readonly<JobFiltersProps>) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  return (
    <Card className='border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-6'>
      <CardContent>
        <div className='flex flex-col w-full md:flex-row gap-4 items-center'>
          {/* Search */}
          <div className='relative flex-1 w-full'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search your jobs...'
              onChange={handleChange}
              className='pl-10 bg-white'
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className='md:w-48 w-full bg-white'>
              <SelectValue placeholder='All Categories' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All Categories'>All Categories</SelectItem>
              {CATEGORY_OPTIONS.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className='md:w-48 w-full bg-white'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newest'>Newest First</SelectItem>
              <SelectItem value='oldest'>Oldest First</SelectItem>
              <SelectItem value='most-applications'>
                Most Applications
              </SelectItem>
              <SelectItem value='highest-pay'>Highest Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
