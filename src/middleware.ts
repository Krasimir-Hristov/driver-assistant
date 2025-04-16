import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Create a response object that we can modify
  const res = NextResponse.next();

  // Create a Supabase client configured for the middleware
  const supabase = createMiddlewareClient({ req: request, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth session error:', error.message);
  }

  // If there's no session and trying to access protected route
  if (!session && request.nextUrl.pathname.startsWith('/authorized')) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If there's a session and trying to access auth page
  if (session && request.nextUrl.pathname === '/') {
    const redirectUrl = new URL('/authorized', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/', '/authorized/:path*'],
};
