import { NextRequest, NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || !["admin", "editor"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      client,
      industry,
      short_description,
      description,
      challenge,
      solution,
      results,
      services,
      featured_image_url,
      gallery,
      status,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const { data: project, error } = await supabase
      .from("portfolio_projects")
      .insert({
        title,
        slug,
        client: client || null,
        industry: industry || null,
        short_description: short_description || null,
        description: description || null,
        challenge: challenge || null,
        solution: solution || null,
        results: results || null,
        services: services || [],
        featured_image_url: featured_image_url || null,
        gallery: gallery || [],
        status: status || "draft",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
