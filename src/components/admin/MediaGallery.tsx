"use client";

import { useState } from "react";
import { Copy, Trash2, Image as ImageIcon } from "lucide-react";
import { StorageFile } from "@/lib/admin-storage";
import { deleteStorageFileAction } from "@/lib/admin-storage-actions";
import { useToast } from "@/contexts/ToastContext";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";

interface MediaGalleryProps {
  files: StorageFile[];
  bucket: "blog-images" | "portfolio-images";
}

export function MediaGallery({ files: initialFiles, bucket }: MediaGalleryProps) {
  const [files, setFiles] = useState(initialFiles);
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("URL copied to clipboard", "success", 3000);
  };

  const handleDelete = async () => {
    if (!selectedFile) return;

    setIsDeleting(true);
    try {
      const result = await deleteStorageFileAction(bucket, selectedFile.path);
      if (result.success) {
        setFiles((prev) => prev.filter((f) => f.path !== selectedFile.path));
        showToast(`Deleted ${selectedFile.name}`, "success");
        setSelectedFile(null);
      } else {
        showToast(result.error || "Failed to delete file", "error");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (files.length === 0) {
    return (
      <EmptyState
        icon={<ImageIcon className="h-12 w-12" />}
        title={`No images in ${bucket}`}
        description="Once you upload images to your blog or portfolio, they'll appear here."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.path}
            className="group rounded-lg border border-slate-800 overflow-hidden bg-slate-900 hover:border-cyan-500/40 transition cursor-pointer"
            onClick={() => setSelectedFile(file)}
          >
            <div className="relative aspect-square bg-slate-800">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover group-hover:opacity-75 transition"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(file.url);
                  }}
                  className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition"
                  title="Copy URL"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(file);
                  }}
                  className="p-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-white truncate">{file.name}</p>
              <p className="text-xs text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedFile(null)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden max-w-2xl w-full">
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-full h-auto max-h-96 object-contain"
              />
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-400">File Name</p>
                  <p className="text-white font-mono text-sm break-all">{selectedFile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">URL</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedFile.url}
                      readOnly
                      className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white font-mono"
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedFile.url)}
                      className="px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="px-4 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setSelectedFile(selectedFile)}
                    className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!selectedFile && selectedFile !== null}
        title="Delete Image"
        description={`Are you sure you want to delete "${selectedFile?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setSelectedFile(null)}
      />
    </>
  );
}
