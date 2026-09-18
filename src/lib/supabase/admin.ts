import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAdminProfile() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return null;
  }

  return {
    user,
    profile,
  };
}

export async function requireAdminAccess() {
  const result = await getAdminProfile();

  if (!result || !result.profile || result.profile.role !== "admin") {
    return null;
  }

  return result;
}

export async function requireEditorAccess() {
  const result = await getAdminProfile();

  if (!result || !result.profile || !["admin", "editor"].includes(result.profile.role)) {
    return null;
  }

  return result;
}
