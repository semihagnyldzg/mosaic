import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const createMockServerClient = () => {
  return {
    auth: {
      async getUser() {
        return { data: { user: null }, error: null };
      },
      async getSession() {
        return { data: { session: null }, error: null };
      }
    },
    from(table: string) {
      return {
        select() {
          return {
            async then(onfulfilled: any) {
              onfulfilled({ data: [], error: null });
            }
          };
        }
      } as any;
    }
  } as any;
};

export const createClient = async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (url.includes('wjdowtmrbomhejcunajc.supabase.co') || !url) {
    return createMockServerClient();
  }

  const cookieStore = await cookies();

  return createServerClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
