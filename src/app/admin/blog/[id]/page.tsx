import { notFound } from "next/navigation";

import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { getBlogCategories, getBlogPostForAdmin } from "@/lib/blog-server";

export default async function AdminBlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, categories] = await Promise.all([getBlogPostForAdmin(id), getBlogCategories()]);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Edit article</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Update blog post</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <BlogPostForm
          categories={categories}
          mode="edit"
          initialValues={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt ?? "",
            categoryId: post.category_id ?? "",
            status: post.status,
            publishedAt: post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : "",
            featuredImageUrl: post.featured_image_url ?? "",
            content: post.content,
          }}
        />
      </div>
    </div>
  );
}
