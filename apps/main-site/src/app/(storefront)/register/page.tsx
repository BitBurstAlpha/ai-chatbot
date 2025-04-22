'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

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
          <h1 className="text-2xl font-bold text-center mb-8">Sign Up</h1>

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
            <span>Sign Up with Google</span>
          </Button>

          {/* Divider with "Or" text using flex approach */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-blue-600"></div>
            <span className="px-4">OR</span>
            <div className="flex-1 border-t border-blue-600"></div>
          </div>

          <div className="text-center mb-6">
            <p>Sign Up with Email</p>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email or Username"
              className="w-full bg-transparent p-3 bg-navy-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              className="w-full p-3 bg-transparent bg-navy-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Enter Password"
              className="w-full p-3 bg-transparent bg-navy-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>

          {/* Sign In Button */}
          <Button size="lg" className="w-full rounded-md mb-6">
            Sign Up
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-400">Already a user? </span>
            <Link href="/signup" className="text-blue-400">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
