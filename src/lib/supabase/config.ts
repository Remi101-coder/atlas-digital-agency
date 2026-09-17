const localSupabaseUrl = "http://127.0.0.1:54321";
const localSupabasePublishableKey = "public-anon-key";

export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (supabaseUrl && supabaseKey) {
    return { supabaseUrl, supabaseKey };
  }

  if (process.env.NODE_ENV === "development") {
    return {
      supabaseUrl: supabaseUrl || localSupabaseUrl,
      supabaseKey: supabaseKey || localSupabasePublishableKey,
    };
  }

  throw new Error(
    "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  );
}