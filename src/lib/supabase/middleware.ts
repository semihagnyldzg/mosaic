import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

const createMockServerClient = () => {
  return {
    auth: {
      async getUser() {
        return { data: { user: null }, error: null };
      },
      async getSession() {
        return { data: { session: null }, error: null };
      }
    }
  } as any;
};

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isSuspendedUrl = url.includes('wjdowtmrbomhejcunajc.supabase.co');
  const shouldMock = !url || isSuspendedUrl || process.env.NEXT_PUBLIC_USE_REAL_SUPABASE !== 'true';

  if (shouldMock) {
    const supabase = createMockServerClient();
    return { response, user: null, supabase };
  }

  const supabase = createServerClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // This will refresh session if expired - required for Server Components
  // to read the correct user session state
  const { data: { user } } = await supabase.auth.getUser();

  return { response, user, supabase };
};
