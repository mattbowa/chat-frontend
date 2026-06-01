"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { listDocuments, uploadDocument, deleteDocument, getDocumentDownloadUrl } from "@/lib/api";
import { Upload, FileText, Loader2 } from "lucide-react";

type Doc = { id: string; filename: string; status: string; chunk_count: number; created_at: string };

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  ready: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<string[]>([]);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDocs = useCallback(async () => {
    const { data } = await listDocuments();
    setDocs(data);
    return data as Doc[];
  }, []);

  // Poll every 2s while any doc is still processing
  const startPolling = useCallback(() => {
    if (pollRef.current) return;
    pollRef.current = setInterval(async () => {
      const data = await fetchDocs();
      const stillProcessing = data.some((d) => d.status === "pending" || d.status === "processing");
      if (!stillProcessing) {
        clearInterval(pollRef.current!);
        pollRef.current = null;
      }
    }, 2000);
  }, [fetchDocs]);

  useEffect(() => {
    fetchDocs();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [fetchDocs]);

  const onDrop = useCallback(async (files: File[]) => {
    setUploading(true);
    setUploadFiles(files.map((f) => f.name));
    await Promise.all(files.map((f) => uploadDocument(f)));
    await fetchDocs();
    setUploading(false);
    setUploadFiles([]);
    startPolling();
  }, [fetchDocs, startPolling]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "text/plain": [], "text/markdown": [] },
    disabled: uploading,
  });

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Documents</h1>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          uploading
            ? "border-blue-300 bg-blue-50 cursor-not-allowed"
            : isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <Upload size={28} className={uploading ? "text-blue-400" : "text-gray-400"} />
          <p className="text-sm text-gray-500">
            {isDragActive
              ? "Drop files here..."
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-xs text-gray-400">PDF, TXT, MD · Max 20 MB</p>
        </div>
      </div>

      {/* Upload progress */}
      {uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <Loader2 size={16} className="text-blue-500 animate-spin shrink-0" />
          <div className="text-sm text-blue-700">
            Uploading {uploadFiles.join(", ")}...
          </div>
        </div>
      )}

      {/* Document list */}
      <div className="bg-white rounded-xl shadow divide-y divide-gray-100">
        {docs.length === 0 && !uploading && (
          <div className="px-4 py-10 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
            <FileText size={28} className="text-gray-300" />
            <p>No documents yet — upload your first file above</p>
          </div>
        )}
        {docs.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <FileText size={16} className="text-gray-400 shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{doc.filename}</p>
                <p className="text-xs text-gray-400">
                  {doc.chunk_count} chunks · {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${STATUS_COLORS[doc.status]}`}>
                {(doc.status === "pending" || doc.status === "processing") && (
                  <Loader2 size={10} className="animate-spin" />
                )}
                {doc.status}
              </span>
              {doc.status === "ready" && (
                <a
                  href={getDocumentDownloadUrl(doc.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Download
                </a>
              )}
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
