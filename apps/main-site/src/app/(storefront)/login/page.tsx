'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(3, 'Password must be at least 6 characters'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, error, isLoading } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to callback URL or dashboard
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard/home');
    }
  }, [isAuthenticated, isLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      await login(values.email, values.password);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex bg-[#0B0B19] text-white relative my-auto mt-20 max-w-screen-2xl mx-auto p-8">
      <div className="select-none absolute inset-0 flex justify-center items-center text-text-brand opacity-10 text-7xl md:text-[320px] lg:text-[380px] font-bold z-10 blur-sm">
        LEXI
      </div>

      {/* Back to Website Link */}
      <div className="absolute top-10 left-10">
        <Link href="/" className="flex items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Website
        </Link>
      </div>

      {/* Left Side with Logo */}
      <div className="select-none hidden md:flex md:w-1/2 items-center justify-center bg-navy-950 relative overflow-hidden">
        <div className="text-text-brand relative text-4xl md:text-[180px] lg:text-[220px] font-bold z-10 ">
          LEXI
          {/* Text shadow/glow effect */}
          <div className="absolute inset-0 text-blue-600 blur-md opacity-70 z-0">
            LEXI
          </div>
          <div className="absolute inset-0 text-blue-600 blur-xl opacity-30 z-0">
            LEXI
          </div>
        </div>
      </div>

      {/* Right Side with Login Form */}
      <div className="w-full z-10 md:w-1/2 flex justify-center items-center px-6 bg-transparent">
        <div className="max-w-md w-full bg-navy-900 p-8 rounded-lg bg-gradient-to-r from-[#3B76F6]/10 to-[#1D58D8]/15">
          <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <Button
            size="lg"
            className="w-full py-2 px-4 border border-gray-600 rounded-md flex justify-center items-center space-x-2 mb-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign In with Google</span>
          </Button>

          {/* Divider with "Or" text using flex approach */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-blue-600"></div>
            <span className="px-4">OR</span>
            <div className="flex-1 border-t border-blue-600"></div>
          </div>

          <div className="text-center mb-6">
            <p>Sign In with Email</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email or Username"
                        className="w-full bg-transparent p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter Password"
                          className="w-full bg-transparent p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Forgot Password */}
              <div className="text-right">
                <Link href="/forgot-password" className="text-blue-400 text-sm">
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center mt-2">
            <span className="text-gray-400">No user yet? </span>
            <Link href="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
