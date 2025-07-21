import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register now to start using our services and join our community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='first-name'>First Name</Label>
              <Input id='first-name' type='text' placeholder='John' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='last-name'>Last Name</Label>
              <Input id='last-name' type='text' placeholder='Doe' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' type='text' placeholder='johndoe' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='johndoe@example.com'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' placeholder='••••••••' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='••••••••'
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-col gap-4'>
        <Button type='submit' className='w-full' size={"lg"}>
          Register
        </Button>
        <CardAction className='text-center w-full'>
          Already have an account?{" "}
          <Link href='/login' className='text-blue-500'>
            Log in
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
