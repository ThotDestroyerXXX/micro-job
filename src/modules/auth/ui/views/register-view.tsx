import Image from "next/image";
import RegisterForm from "../sections/register-form";

export default function RegisterView() {
  return (
    <div className='justify-center items-center flex min-h-screen h-full p-4'>
      <Image
        src={"/images/auth-image.jpg"}
        alt='image'
        width={800}
        height={800}
        className='w-full min-h-screen h-full object-cover fixed top-0 left-0 -z-10 brightness-75'
      />
      <RegisterForm />
    </div>
  );
}
