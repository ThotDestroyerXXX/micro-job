"use client";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ViewModeToggle({
  viewMode,
  setViewMode,
}: Readonly<{
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
}>) {
  const isMobile = useIsMobile();
  return (
    <div className='flex items-center gap-2'>
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size='sm'
        onClick={() => setViewMode("grid")}
        className='bg-white shadow-sm'
      >
        <Grid className='h-4 w-4 text-black ' />
      </Button>
      {!isMobile && (
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size='sm'
          onClick={() => setViewMode("list")}
          className='bg-white shadow-sm'
        >
          <List className='h-4 w-4 text-black' />
        </Button>
      )}
    </div>
  );
}
