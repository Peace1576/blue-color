import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtected = path.startsWith('/dashboard') || path.startsWith('/subscribe');

  if (isProtected) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  // Only run middleware on protected routes + API — NOT on homepage or public pages
  matcher: [
    '/dashboard/:path*',
    '/subscribe/:path*',
    '/dashboard',
    '/subscribe',
    '/(api|trpc)(.*)',
  ],
};
