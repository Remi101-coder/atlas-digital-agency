import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

function createSupabaseMiddlewareClient(request: NextRequest, response: NextResponse) {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (pathname === "/admin/login") {
    const supabase = createSupabaseMiddlewareClient(request, response);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  if (pathname.startsWith("/admin")) {
    const supabase = createSupabaseMiddlewareClient(request, response);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
