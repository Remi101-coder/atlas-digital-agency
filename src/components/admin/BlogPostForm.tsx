"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { BLOG_STORAGE_BUCKET, getTiptapExtensions, slugify } from "@/lib/blog";
import { validateImageFile } from "@/lib/storage";
import { compressImageToWebP } from "@/lib/image-compression";
import { useToast } from "@/contexts/ToastContext";

export type BlogFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  featuredImageUrl: string;
  content: string;
};

export function BlogPostForm({
  categories,
  initialValues,
  mode,
}: {
  categories: Array<{ id: string; name: string; slug: string }>;
  initialValues?: Partial<BlogFormValues>;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? "");
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? "");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    (initialValues?.status as "draft" | "published" | "archived") ?? "draft",
  );
  const [publishedAt, setPublishedAt] = useState(initialValues?.publishedAt ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(initialValues?.featuredImageUrl ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSlugTouched, setLastSlugTouched] = useState(Boolean(initialValues?.slug));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const editor = useEditor({
    extensions: getTiptapExtensions(),
    content: initialValues?.content ? JSON.parse(initialValues.content) : { type: "doc", content: [] },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[280px] rounded-xl border border-slate-700 bg-slate-950 p-4 text-white",
      },
    },
  });

  useEffect(() => {
    if (!title || lastSlugTouched) {
      return;
    }

    setSlug(slugify(title));
  }, [title, lastSlugTouched]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isSubmitting]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setHasUnsavedChanges(true);
    if (!lastSlugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      validateImageFile(file);

      const compressed = await compressImageToWebP(file);

      const supabase = createBrowserSupabaseClient();
      const fileName = `posts/featured/${Date.now()}-${compressed.name}`;
      const { error: uploadError } = await supabase.storage
        .from(BLOG_STORAGE_BUCKET)
        .upload(fileName, compressed, { upsert: true, contentType: "image/webp" });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(BLOG_STORAGE_BUCKET).getPublicUrl(fileName);
      setFeaturedImageUrl(data.publicUrl);
      setHasUnsavedChanges(true);
      showToast("Image compressed to WebP and uploaded", "success", 3000);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error ? uploadError.message : "Image upload failed. Check the Supabase storage bucket.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!editor) {
      setError("Editor is not ready.");
      showToast("Editor failed to load", "error");
      setIsSubmitting(false);
      return;
    }

    const content = JSON.stringify(editor.getJSON());
    const endpoint = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${initialValues?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          category_id: categoryId,
          status,
          published_at: status === "published" ? publishedAt || new Date().toISOString() : null,
          featured_image_url: featuredImageUrl,
          content,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to save the blog post.");
      }

      const data = await response.json().catch(() => null);
      const nextId = data?.post?.id ?? initialValues?.id;
      
      showToast(
        mode === "create" ? "Blog post created successfully" : "Blog post updated successfully",
        "success"
      );
      setHasUnsavedChanges(false);
      router.push(nextId ? `/admin/blog/${nextId}` : "/admin/blog");
      router.refresh();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Unknown save error.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Title</label>
          <input
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Blog title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Slug</label>
          <input
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setLastSlugTouched(true);
              setHasUnsavedChanges(true);
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="article-slug"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Category</label>
          <select
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
              setHasUnsavedChanges(true);
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="">Uncategorized</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(event) => {
              setExcerpt(event.target.value);
              setHasUnsavedChanges(true);
            }}
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Short summary for listings and SEO"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Status</label>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as "draft" | "published" | "archived");
              setHasUnsavedChanges(true);
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Publication date</label>
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(event) => {
              setPublishedAt(event.target.value);
              setHasUnsavedChanges(true);
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Featured image</label>
          <div className="flex flex-col gap-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-4">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-slate-300" />
            {isUploading ? <p className="text-sm text-cyan-300">Compressing to WebP and uploading…</p> : null}
            {featuredImageUrl ? (
              <img src={featuredImageUrl} alt="Featured preview" className="h-48 w-full rounded-xl object-cover" />
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
        <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
          <span>Content</span>
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">Rich text</span>
        </div>
        <EditorContent editor={editor} />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
              return;
            }
            setHasUnsavedChanges(false);
            router.push("/admin/blog");
          }}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:border-slate-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
