'use client';

import { useAuth } from '@/context/auth-context';
export default function HomePage() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return <h1>body</h1>;
}
