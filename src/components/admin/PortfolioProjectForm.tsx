"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { PORTFOLIO_STORAGE_BUCKET, slugifyPortfolio } from "@/lib/portfolio";
import { validateImageFile } from "@/lib/storage";
import { compressImageToWebP } from "@/lib/image-compression";
import { useToast } from "@/contexts/ToastContext";

export type PortfolioFormValues = {
  id?: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  short_description: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  services: string[];
  status: "draft" | "published" | "archived";
  featured_image_url: string;
  gallery: Array<{ url: string; alt?: string }>;
};

interface GalleryImage {
  url: string;
  alt?: string;
}

export function PortfolioProjectForm({
  initialValues,
  mode,
}: {
  initialValues?: Partial<PortfolioFormValues>;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [client, setClient] = useState(initialValues?.client ?? "");
  const [industry, setIndustry] = useState(initialValues?.industry ?? "");
  const [shortDescription, setShortDescription] = useState(
    initialValues?.short_description ?? ""
  );
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [challenge, setChallenge] = useState(initialValues?.challenge ?? "");
  const [solution, setSolution] = useState(initialValues?.solution ?? "");
  const [results, setResults] = useState(initialValues?.results ?? "");
  const [services, setServices] = useState<string[]>(initialValues?.services ?? []);
  const [serviceInput, setServiceInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    (initialValues?.status as "draft" | "published" | "archived") ?? "draft"
  );
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    initialValues?.featured_image_url ?? ""
  );
  const [gallery, setGallery] = useState<GalleryImage[]>(
    initialValues?.gallery ?? []
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSlugTouched, setLastSlugTouched] = useState(Boolean(initialValues?.slug));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!title || lastSlugTouched) {
      return;
    }

    setSlug(slugifyPortfolio(title));
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
      setSlug(slugifyPortfolio(value));
    }
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setServices([...services, serviceInput.trim()]);
      setServiceInput("");
      setHasUnsavedChanges(true);
    }
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const handleFeaturedImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const fileName = `featured/${Date.now()}-${compressed.name}`;
      const { error: uploadError } = await supabase.storage
        .from(PORTFOLIO_STORAGE_BUCKET)
        .upload(fileName, compressed, { upsert: true, contentType: "image/webp" });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(PORTFOLIO_STORAGE_BUCKET).getPublicUrl(fileName);
      setFeaturedImageUrl(data.publicUrl);
      setHasUnsavedChanges(true);
      showToast("Featured image uploaded successfully", "success", 3000);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Featured image upload failed. Check the Supabase storage bucket.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files || files.length === 0) {
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const supabase = createBrowserSupabaseClient();
      const newGalleryImages: GalleryImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        validateImageFile(file);

        const compressed = await compressImageToWebP(file);
        const fileName = `gallery/${Date.now()}-${i}-${compressed.name}`;
        const { error: uploadError } = await supabase.storage
          .from(PORTFOLIO_STORAGE_BUCKET)
          .upload(fileName, compressed, { upsert: true, contentType: "image/webp" });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from(PORTFOLIO_STORAGE_BUCKET)
          .getPublicUrl(fileName);
        newGalleryImages.push({ url: data.publicUrl });
      }

      setGallery([...gallery, ...newGalleryImages]);
      setHasUnsavedChanges(true);
      showToast(`${files.length} image(s) added to gallery`, "success", 3000);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Gallery upload failed. Check the Supabase storage bucket.";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const endpoint =
        mode === "create" ? "/api/admin/portfolio" : `/api/admin/portfolio/${initialValues?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          client,
          industry,
          short_description: shortDescription,
          description,
          challenge,
          solution,
          results,
          services,
          featured_image_url: featuredImageUrl,
          gallery,
          status,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to save the portfolio project.");
      }

      const data = await response.json().catch(() => null);
      const nextId = data?.project?.id ?? initialValues?.id;
      
      showToast(
        mode === "create" ? "Project created successfully" : "Project updated successfully",
        "success"
      );
      setHasUnsavedChanges(false);
      router.push(nextId ? `/admin/portfolio/${nextId}` : "/admin/portfolio");
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
          <label className="text-sm text-slate-300">Title *</label>
          <input
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Project title"
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
            placeholder="project-slug"
            required
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
          <label className="text-sm text-slate-300">Client</label>
          <input
            value={client}
            onChange={(event) => {
              setClient(event.target.value);
              setHasUnsavedChanges(true);
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Client name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Industry</label>
          <input
            value={industry}
            onChange={(event) => {
              setIndustry(event.target.value);
              setHasUnsavedChanges(true);
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Industry"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(event) => {
              setShortDescription(event.target.value);
              setHasUnsavedChanges(true);
            }}
            rows={2}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Brief summary for listings"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Full Description</label>
          <textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setHasUnsavedChanges(true);
            }}
            rows={4}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Full project description"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Challenge</label>
          <textarea
            value={challenge}
            onChange={(event) => {
              setChallenge(event.target.value);
              setHasUnsavedChanges(true);
            }}
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="What was the challenge?"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Solution</label>
          <textarea
            value={solution}
            onChange={(event) => {
              setSolution(event.target.value);
              setHasUnsavedChanges(true);
            }}
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="How did we solve it?"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Results</label>
          <textarea
            value={results}
            onChange={(event) => {
              setResults(event.target.value);
              setHasUnsavedChanges(true);
            }}
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="What were the results?"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Services</label>
          <div className="flex gap-2">
            <input
              value={serviceInput}
              onChange={(event) => setServiceInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addService();
                }
              }}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              placeholder="Add a service (e.g., Web Design, Development)"
            />
            <button
              type="button"
              onClick={addService}
              className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {services.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-blue-950 px-3 py-1 text-sm text-blue-100"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="hover:text-blue-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFeaturedImageUpload}
            disabled={isUploading}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
          {featuredImageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <img
                src={featuredImageUrl}
                alt="Featured"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-slate-300">Gallery Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryUpload}
            disabled={isUploading}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />

          {gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  <img
                    src={image.url}
                    alt="Gallery"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="flex-1 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Project"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
              return;
            }
            setHasUnsavedChanges(false);
            router.back();
          }}
          className="flex-1 rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-slate-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
