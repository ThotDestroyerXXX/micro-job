import { Avatar, AvatarImage } from "./ui/avatar";

export default function UserAvatar({
  image,
  alt,
  className,
}: Readonly<{ image: string | null; alt: string; className?: string }>) {
  return (
    <Avatar className={`h-10 w-10 ring-2 ring-white shrink-0 ${className}`}>
      <AvatarImage src={image ?? "/images/auth-image.jpg"} alt={alt} />
    </Avatar>
  );
}
