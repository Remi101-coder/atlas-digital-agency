import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { getBlogCategories } from "@/lib/blog-server";

export default async function AdminNewBlogPage() {
  const categories = await getBlogCategories();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">New article</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Create blog post</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <BlogPostForm categories={categories} mode="create" />
      </div>
    </div>
  );
}
