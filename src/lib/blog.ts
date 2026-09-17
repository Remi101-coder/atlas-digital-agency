import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import sanitizeHtml from "sanitize-html";

export const BLOG_STORAGE_BUCKET = "blog-images";
export type BlogPostStatus = "draft" | "published" | "archived";

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type BlogPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featured_image_url?: string | null;
  status: BlogPostStatus;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  author_id?: string;
  category_id?: string | null;
  profiles?: { full_name?: string | null } | null;
  blog_categories?: BlogCategory | null;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getTiptapExtensions() {
  return [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: "noopener noreferrer nofollow",
        target: "_blank",
      },
    }),
    Placeholder.configure({
      placeholder: "Write your story…",
    }),
    Image.configure({
      inline: false,
      HTMLAttributes: {
        class: "rounded-xl my-6",
      },
    }),
  ];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTipTapNode(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  const value = node as {
    type?: string;
    text?: string;
    attrs?: Record<string, unknown>;
    content?: unknown[];
  };
  const children = (value.content ?? []).map(renderTipTapNode).join("");

  if (value.type === "text") {
    let text = escapeHtml(value.text ?? "");
    const marks = (node as { marks?: Array<{ type?: string; attrs?: Record<string, unknown> }> }).marks ?? [];

    for (const mark of marks) {
      if (mark.type === "bold") text = `<strong>${text}</strong>`;
      if (mark.type === "italic") text = `<em>${text}</em>`;
      if (mark.type === "underline") text = `<u>${text}</u>`;
      if (mark.type === "strike") text = `<s>${text}</s>`;
      if (mark.type === "code") text = `<code>${text}</code>`;
      if (mark.type === "link" && typeof mark.attrs?.href === "string") {
        text = `<a href="${escapeHtml(mark.attrs.href)}">${text}</a>`;
      }
    }

    return text;
  }

  switch (value.type) {
    case "doc":
      return children;
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading": {
      const level = Math.min(Math.max(Number(value.attrs?.level) || 1, 1), 6);
      return `<h${level}>${children}</h${level}>`;
    }
    case "bulletList":
      return `<ul>${children}</ul>`;
    case "orderedList":
      return `<ol>${children}</ol>`;
    case "listItem":
      return `<li>${children}</li>`;
    case "blockquote":
      return `<blockquote>${children}</blockquote>`;
    case "codeBlock":
      return `<pre><code>${children}</code></pre>`;
    case "hardBreak":
      return "<br />";
    case "horizontalRule":
      return "<hr />";
    case "image": {
      const src = typeof value.attrs?.src === "string" ? value.attrs.src : "";
      const alt = typeof value.attrs?.alt === "string" ? value.attrs.alt : "";
      return src ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />` : "";
    }
    default:
      return children;
  }
}

export function renderRichText(content: string | null | undefined) {
  if (!content) {
    return "";
  }

  try {
    const parsed = JSON.parse(content);
    const html = renderTipTapNode(parsed);

    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "a",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h1",
        "h2",
        "h3",
        "h4",
        "img",
        "figure",
        "figcaption",
        "code",
        "pre",
        "hr",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "title"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });
  } catch {
    return sanitizeHtml(content, {
      allowedTags: [
        "p",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "a",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h1",
        "h2",
        "h3",
        "h4",
        "img",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "title"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });
  }
}

export function estimateReadingTime(content: string | null | undefined) {
  if (!content) return 1;
  const plain = renderRichText(content).replace(/<[^>]+>/g, " ");
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(value?: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
