import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className='flex items-center justify-center max-w-lg w-full border-2 border-secondary rounded-lg '>
      <Input className='flex-1 border-0 p-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50' />
      <Button className='h-8 w-8 mr-1'>
        <SearchIcon />
      </Button>
    </div>
  );
}
