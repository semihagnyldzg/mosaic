import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Bypass authentication check for static assets
  if (
    path.includes('.') || 
    path.startsWith('/assets/') || 
    path.startsWith('/_next/') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const { response, user, supabase } = await updateSession(request);

  // Allow public access to all pages (including dashboards) for guest mode
  if (!user) {
    return response;
  }

  // If authenticated and accessing /, /login, or /forgot-password, redirect to role dashboard
  if (path === '/' || path === '/login' || path === '/forgot-password') {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    const role = roleData?.role;

    if (role === 'district_admin') {
      return NextResponse.redirect(new URL('/dashboard/district', request.url));
    } else if (role === 'principal') {
      return NextResponse.redirect(new URL('/dashboard/school', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard/discovery', request.url));
    }
  }

  // Protect sub-routes by role
  if (path.startsWith('/dashboard')) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    const role = roleData?.role;

    if (path.startsWith('/dashboard/district') && role !== 'district_admin') {
      return NextResponse.redirect(new URL('/dashboard/teacher', request.url));
    }
    if (path.startsWith('/dashboard/school') && role !== 'principal' && role !== 'district_admin') {
      return NextResponse.redirect(new URL('/dashboard/teacher', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};
