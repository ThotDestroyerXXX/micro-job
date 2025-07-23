import Image from "next/image";
import LoginForm from "../sections/login-form";

export default function LoginView() {
  return (
    <div className='justify-center items-center flex h-screen p-4'>
      <Image
        src={"/images/auth-image.jpg"}
        alt='image'
        width={800}
        height={800}
        className='w-full h-screen object-cover absolute top-0 left-0 -z-10 brightness-75'
      />
      <LoginForm />
    </div>
  );
}
