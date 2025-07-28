import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";

export default function SafetyTips() {
  return (
    <Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'>
      <CardContent className='p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Shield className='h-5 w-5 text-blue-600' />
          <h3 className='font-semibold text-blue-900'>Safety Tips</h3>
        </div>
        <ul className='space-y-2 text-sm text-blue-800'>
          <li className='flex items-start gap-2'>
            <CheckCircle className='h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0' />
            Always meet in public places for initial meetings
          </li>
          <li className='flex items-start gap-2'>
            <CheckCircle className='h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0' />
            Verify employer identity before starting work
          </li>
          <li className='flex items-start gap-2'>
            <CheckCircle className='h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0' />
            Use platform messaging for communication
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
