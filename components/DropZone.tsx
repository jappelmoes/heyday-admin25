"use client";

import React, { useState } from "react";

export default function DropZone({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("File upload failed");
        }

        const result = await response.json();
        console.log("File uploaded successfully:", result);
        onUploadComplete();
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
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
