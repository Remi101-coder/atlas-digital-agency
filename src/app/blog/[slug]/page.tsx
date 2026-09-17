import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { estimateReadingTime, formatDate, renderRichText } from "@/lib/blog";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog-server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Atlas Digital Group",
    };
  }

  const description = post.excerpt || "Atlas Digital Group blog article.";

  return {
    title: `${post.title} | Atlas Digital Group`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : undefined,
      publishedTime: post.published_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  };
}

export default async function PublicBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = renderRichText(post.content);
  const readingTime = estimateReadingTime(post.content);
  const relatedPosts = await getRelatedBlogPosts(post);

  return (
    <main className="min-h-screen bg-slate-950 text-atlas-cream">
      <Navbar />

      <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <Link
              href={post.blog_categories?.slug ? `/blog?category=${post.blog_categories.slug}` : "/blog"}
              className="text-xs font-unbounded uppercase tracking-[0.32em] text-atlas-gold hover:text-atlas-gold-light transition-colors"
            >
              {post.blog_categories?.name ?? "General"}
            </Link>
          </div>

          <h1 className="font-noto-serif text-3xl sm:text-4xl md:text-5xl text-atlas-cream text-center leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
            <span>{post.profiles?.full_name ?? "Atlas team"}</span>
            <span>&middot;</span>
            <span>{formatDate(post.published_at)}</span>
            <span>&middot;</span>
            <span>{readingTime} min read</span>
          </div>
        </div>

        {post.featured_image_url ? (
          <figure className="mx-auto mt-10 max-w-5xl">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full rounded-3xl object-cover max-h-[480px]"
            />
          </figure>
        ) : null}

        <div
          className="mx-auto mt-12 max-w-[700px] font-barlow text-slate-300 leading-relaxed
            [&>h2]:font-unbounded [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-atlas-cream [&>h2]:mt-12 [&>h2]:mb-4
            [&>h3]:font-unbounded [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-atlas-cream [&>h3]:mt-8 [&>h3]:mb-3
            [&>p]:mb-5 [&>p]:text-base [&>p]:md:text-lg
            [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:mb-5 [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:mb-2
            [&>blockquote]:border-l-2 [&>blockquote]:border-atlas-gold [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-400 [&>blockquote]:my-6
            [&_a]:text-atlas-gold [&_a]:underline [&_a]:decoration-atlas-gold/40 hover:[&_a]:text-atlas-gold-light
            [&>img]:rounded-2xl [&>img]:my-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mx-auto mt-16 max-w-[700px] rounded-2xl border border-atlas-gold/30 bg-atlas-gold/5 p-8 text-center">
          <h3 className="font-unbounded text-lg font-bold text-atlas-cream">Ready to grow with Atlas?</h3>
          <p className="mt-2 text-sm text-slate-400">
            Book a free consultation and let&apos;s turn these ideas into results for your business.
          </p>
          <Link
            href="#contact"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-atlas-gold px-8 py-3 text-sm font-bold text-slate-950 uppercase tracking-[0.2em] hover:bg-atlas-gold-light transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {relatedPosts.length > 0 ? (
          <div className="mx-auto mt-20 max-w-5xl">
            <h3 className="font-unbounded text-xs uppercase tracking-[0.3em] text-atlas-gold text-center mb-8">
              Read next
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-atlas-gold/50"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-800">
                    {related.featured_image_url ? (
                      <img
                        src={related.featured_image_url}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-unbounded uppercase tracking-[0.2em] text-atlas-gold">
                      {related.blog_categories?.name ?? "General"}
                    </span>
                    <h4 className="mt-2 font-unbounded font-bold text-atlas-cream group-hover:text-atlas-gold transition-colors">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      <Footer />
    </main>
  );
}
