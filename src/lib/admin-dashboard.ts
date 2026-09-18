import { createServerSupabaseClient } from "@/lib/supabase/server";

interface DashboardStats {
  publishedBlogCount: number;
  draftBlogCount: number;
  publishedPortfolioCount: number;
  draftPortfolioCount: number;
}

interface RecentContent {
  id: string;
  type: "blog" | "portfolio";
  title: string;
  status: string;
  updated_at: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createServerSupabaseClient();

  const [blogResult, portfolioResult] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("id, status", { count: "exact", head: true })
      .then((res) => ({
        published: supabase
          .from("blog_posts")
          .select("id", { count: "exact", head: true })
          .eq("status", "published")
          .then((r) => r.count || 0),
        draft: supabase
          .from("blog_posts")
          .select("id", { count: "exact", head: true })
          .eq("status", "draft")
          .then((r) => r.count || 0),
      })),
    supabase
      .from("portfolio_projects")
      .select("id, status", { count: "exact", head: true })
      .then((res) => ({
        published: supabase
          .from("portfolio_projects")
          .select("id", { count: "exact", head: true })
          .eq("status", "published")
          .then((r) => r.count || 0),
        draft: supabase
          .from("portfolio_projects")
          .select("id", { count: "exact", head: true })
          .eq("status", "draft")
          .then((r) => r.count || 0),
      })),
  ]);

  const [publishedBlog, draftBlog, publishedPortfolio, draftPortfolio] = await Promise.all([
    blogResult.published,
    blogResult.draft,
    portfolioResult.published,
    portfolioResult.draft,
  ]);

  return {
    publishedBlogCount: publishedBlog,
    draftBlogCount: draftBlog,
    publishedPortfolioCount: publishedPortfolio,
    draftPortfolioCount: draftPortfolio,
  };
}

export async function getRecentContent(limit: number = 5): Promise<RecentContent[]> {
  const supabase = await createServerSupabaseClient();

  const [blogData, portfolioData] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("id, title, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(limit),
    supabase
      .from("portfolio_projects")
      .select("id, title, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(limit),
  ]);

  const blog = (blogData.data || []).map((post) => ({
    id: post.id,
    type: "blog" as const,
    title: post.title,
    status: post.status,
    updated_at: post.updated_at,
  }));

  const portfolio = (portfolioData.data || []).map((project) => ({
    id: project.id,
    type: "portfolio" as const,
    title: project.title,
    status: project.status,
    updated_at: project.updated_at,
  }));

  return [...blog, ...portfolio]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit);
}
