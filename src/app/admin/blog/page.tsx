import { BlogListTable } from "@/components/admin/BlogListTable";
import { getAdminBlogPosts, getBlogCategories } from "@/lib/blog-server";

export default async function AdminBlogPage() {
  const [posts, categories] = await Promise.all([getAdminBlogPosts(), getBlogCategories()]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Blog CMS</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Manage blog content</h2>
      </div>

      <BlogListTable initialPosts={posts} categories={categories} />
    </div>
  );
}
