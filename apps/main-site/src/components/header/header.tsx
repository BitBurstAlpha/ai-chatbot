import Link from 'next/link';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <div className="sticky z-50">
      <div className="pt-8">
        <header className="max-w-7xl mx-auto bg-gradient-to-b rounded-lg from-[#09091D] to-[#09091D]">
          <nav className="flex items-center justify-between h-20 px-8">
            {/* Logo */}
            <Link href="/" className="text-blue-500 text-xl font-bold">
              Lexi.AI
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 text-sm bg-[#99C9FF]/10 px-8 py-3 border-border border rounded-full">
              <div className="flex items-center space-x-8">
                {/* Product Dropdown */}
                <div className="relative group">
                  <button className="text-gray-300 hover:text-white flex items-center space-x-1">
                    <span>Product</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Other Nav Links */}
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
                <Link href="/docs" className="text-gray-300 hover:text-white">
                  Docs
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white"
                >
                  Pricing
                </Link>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign in</Button>
              <Button>Sign-Up</Button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};
