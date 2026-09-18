// Client-side resize + WebP re-encode for images uploaded through the admin
// panel, using the Canvas API so no extra dependency is needed. Mirrors the
// max-width/max-size discipline used for the site's own blog images.
export async function compressImageToWebP(
  file: File,
  options: { maxWidth?: number; maxBytes?: number; initialQuality?: number; minQuality?: number } = {},
): Promise<File> {
  const { maxWidth = 1600, maxBytes = 200 * 1024, initialQuality = 0.82, minQuality = 0.4 } = options;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Image compression is not supported in this browser.");
  }

  ctx.drawImage(bitmap, 0, 0, width, height);

  let quality = initialQuality;
  let blob: Blob | null = null;

  while (quality >= minQuality) {
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));

    if (!blob) {
      throw new Error("Image compression failed.");
    }

    if (blob.size <= maxBytes) {
      break;
    }

    quality -= 0.1;
  }

  if (!blob) {
    throw new Error("Image compression failed.");
  }

  const baseName = file.name.replace(/\.[^./]+$/, "").replace(/\s+/g, "-");
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}
