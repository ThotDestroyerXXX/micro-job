import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  color = "from-gray-500 to-gray-600",
  link = "#",
}: Readonly<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color?: string;
  link?: string;
}>) {
  return (
    <Link href={link}>
      <Card className='group hover:shadow-md transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50 py-6 px-3'>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${color} flex items-center justify-center`}
            >
              <Icon className='h-6 w-6 text-white' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                {title}
              </h3>
              <p className='text-sm text-gray-600'>{description}</p>
            </div>
            <ArrowRight className='h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors' />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
