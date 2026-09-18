export const BLOG_STORAGE_BUCKET = "blog-images";
export const PORTFOLIO_STORAGE_BUCKET = "portfolio-images";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export function validateImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Use JPG, PNG, WebP, or AVIF.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image is too large. Please use a file under 5MB.");
  }
}
