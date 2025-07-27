"use client";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ViewModeToggle({
  viewMode,
  setViewMode,
}: Readonly<{
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
}>) {
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
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size='sm'
        onClick={() => setViewMode("list")}
        className='bg-white shadow-sm'
      >
        <List className='h-4 w-4 text-black' />
      </Button>
    </div>
  );
}
