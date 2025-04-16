import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and trying to access protected route
  if (!session && request.nextUrl.pathname.startsWith('/authorized')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If there's a session and trying to access auth page
  if (session && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/authorized', request.url));
  }

  return res;
}
