import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createBrowserSupabaseClient() {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  return createBrowserClient(supabaseUrl, supabaseKey);
}
