'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { AlertCircle, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

export default function WebhooksPage() {
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    // Check if the user is authenticated
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [authLoading, router]);

  return (
    <div className="h-[calc(100vh-64px)] bg-[#0D1117] text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Webhooks</h1>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 bg-[#161C2C] rounded-full flex items-center justify-center mb-4">
          <Construction className="h-8 w-8 text-yellow-400" />
        </div>
        <h2 className="text-xl font-medium text-white mb-2">
          Feature Not Implemented Yet
        </h2>
        <p className="text-gray-400 max-w-md mb-6">
          The Webhooks page is currently under development and will be available
          soon.
        </p>
        <div className="bg-[#161C2C] border border-[#1E293B] rounded-md p-4 max-w-lg">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-white mb-1">Coming Soon</h3>
              <p className="text-sm text-gray-400">
                Check back later for updates or contact support for more
                information.
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-8 bg-[#1E293B] hover:bg-[#2D3A4F] text-white"
          onClick={() => router.push('/dashboard/home')}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
