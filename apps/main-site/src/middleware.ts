import { NextRequest, NextResponse } from 'next/server';

// Define routes that require authentication
const protectedRoutes = ['/dashboard', '/home', '/knowledge', '/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the route is not in the protected list, allow access without authentication
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get token from cookies
  const authToken = request.cookies.get('authToken')?.value;

  // If no token and trying to access protected route, redirect to login
  if (!authToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // For protected routes, verify token validity
  try {
    // Check if token is valid by making a request to the user API
    const response = await fetch(
      'https://web-production-59b12.up.railway.app/api/v1/user/me',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      // If token is invalid, redirect to login
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    // Token is valid, proceed with the request
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On any error, redirect to login
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  // Only match protected routes, excluding static files and API routes
  matcher: [
    '/dashboard/:path*',
    '/home/:path*',
    '/knowledge/:path*',
    '/profile/:path*',
  ],
};
