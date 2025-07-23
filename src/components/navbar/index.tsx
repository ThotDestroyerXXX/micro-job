import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Search from "../search";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between max-sm:justify-center p-4 gap-4 fixed top-0 left-0 right-0 z-50'>
      <h1 className='font-baumans text-2xl max-sm:hidden'>MicroJob</h1>
      <Search />
      <ul className='max-sm:hidden'>
        <li>
          <Link href='/login' className='hover:underline'>
            <Button className='' size={"lg"}>
              <User className='size-5' />
              Login
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
