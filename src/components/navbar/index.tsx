import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Search from "../search";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileDropdown from "./profile-dropdown";

export default async function Navbar() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <nav className=' w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl w-full mx-auto flex items-center justify-between max-sm:justify-center gap-4'>
        <h1 className='font-baumans text-2xl max-sm:hidden'>MicroJob</h1>
        <Search />
        <ul className='max-sm:hidden'>
          <li>
            {data?.user ? (
              <ProfileDropdown image={data?.user.image} />
            ) : (
              <Link href='/login' className='hover:underline'>
                <Button className='' size={"lg"}>
                  <User className='size-5' />
                  Login
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
