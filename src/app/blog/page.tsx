import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { estimateReadingTime, formatDate } from "@/lib/blog";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/blog-server";

export const metadata: Metadata = {
  title: "Blog | Atlas Digital Group",
  description: "Insights on digital growth, websites, marketing, automation and support from Atlas Digital Group.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function PublicBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [posts, categories] = await Promise.all([getPublishedBlogPosts(), getBlogCategories()]);

  const filteredPosts = category
    ? posts.filter((post) => post.blog_categories?.slug === category)
    : posts;

  return (
    <main className="min-h-screen bg-slate-950 text-atlas-cream">
      <Navbar />

      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-unbounded uppercase tracking-[0.35em] text-atlas-gold">Insights</p>
          <h1 className="mt-4 font-noto-serif text-4xl md:text-5xl text-atlas-cream">The Atlas Blog</h1>
          <p className="mt-4 font-barlow text-slate-400 max-w-2xl mx-auto">
            Practical thinking on websites, digital marketing, automation and growth.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-1.5 text-xs font-unbounded uppercase tracking-[0.15em] transition-colors ${
              !category
                ? "border-atlas-gold bg-atlas-gold/10 text-atlas-gold"
                : "border-slate-700 text-slate-400 hover:border-atlas-gold hover:text-atlas-gold"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`rounded-full border px-4 py-1.5 text-xs font-unbounded uppercase tracking-[0.15em] transition-colors ${
                category === cat.slug
                  ? "border-atlas-gold bg-atlas-gold/10 text-atlas-gold"
                  : "border-slate-700 text-slate-400 hover:border-atlas-gold hover:text-atlas-gold"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-slate-400">
              No published articles in this category yet.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-atlas-gold/50"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-800">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-600 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="text-xs font-unbounded uppercase tracking-[0.25em] text-atlas-gold">
                      {post.blog_categories?.name ?? "General"}
                    </span>
                    <h2 className="font-unbounded text-xl font-bold text-atlas-cream leading-snug group-hover:text-atlas-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt || "Read the latest insights from Atlas."}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-slate-500">
                      <span>{formatDate(post.published_at)}</span>
                      <span>&middot;</span>
                      <span>{estimateReadingTime(post.content)} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
