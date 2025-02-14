"use client";

import React, { useState } from "react";
import { mediaService } from "@/utils/mediazone/mediaService";

export default function DropZone({
  onUploadComplete,
  selectedFolder,
}: {
  onUploadComplete: () => void;
  selectedFolder: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    try {
      await mediaService.uploadFile(e.target.files[0], selectedFolder);
      onUploadComplete();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary"
        onChange={handleFileChange}
      />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
