"use client";

import React from "react";
import DropZone from "./DropZone";
import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  mediaService,
  MediaItem,
  MediaFolder,
} from "@/utils/mediazone/mediaService";

export default function MediaZone({ editor }: { editor: Editor }) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  const fetchFolders = async () => {
    const data = await mediaService.getFolders();
    setFolders(data);
  };

  const fetchMedia = async () => {
    const data = await mediaService.getMedia(selectedFolder);
    setMediaItems(data);
  };

  const handleMove = async (itemId: string, newFolder: string) => {
    try {
      await mediaService.moveFile(itemId, newFolder);
      fetchMedia(); // Refresh the media list
    } catch (error) {
      console.error("Error moving file:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchMedia();
  }, [selectedFolder]);

  return (
    <div className="flex flex-col gap-4 bg-gray-900 p-8 rounded-3xl">
      <div className="flex gap-4 flex-col items-start justify-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Media library</h1>
          <p className="text-sm text-gray-500">
            Click on an image to insert it into the editor
          </p>
        </div>
        <div className="flex w-full items-center gap-2">
          <select
            className="select select-primary w-full max-w-xs"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            <option key="all" value="">
              All images
            </option>
            {folders.map((folder) => (
              <option key={folder.name} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={() =>
              (
                document.getElementById("dropzone_modal") as HTMLDialogElement
              )?.showModal()
            }
          >
            Add Media
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {mediaItems.map((item) => (
          <div key={item.id} className="group relative aspect-square">
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${item.folder}/${item.name}`}
              alt={item.name}
              className="h-full w-full cursor-pointer rounded-lg object-cover border border-gray-500 hover:border-2 hover:border-white"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${item.folder}/${item.name}`,
                  })
                  .run();
              }}
            />
          </div>
        ))}
      </div>

      {/* Dropzone modal */}
      <dialog id="dropzone_modal" className="modal">
        <div className="modal-box flex w-11/12 max-w-5xl flex-col gap-4">
          <h3 className="text-lg font-bold">Media Library</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Add or remove media files from your library
            </p>
            <p className="text-xs text-red-500">
              Only jpg, png or gif files are allowed
            </p>
            <select
              className="select select-primary w-full max-w-xs"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option key="all" value="">
                All images
              </option>
              {folders.map((folder) => (
                <option key={folder.name} value={folder.name}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {mediaItems.map((item) => (
              <div key={item.id} className="group relative aspect-square">
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${item.folder}/${item.name}`}
                  alt={item.name}
                  className="h-full w-full cursor-pointer rounded-lg object-cover hover:border-2 hover:border-blue-300"
                />
                <div className="absolute bottom-0 left-0 right-0 hidden bg-black/50 p-1 group-hover:block">
                  <select
                    className="select select-xs w-full"
                    onChange={(e) => handleMove(item.id, e.target.value)}
                    value={item.folder || ""}
                  >
                    <option value="uploads">uploads</option>
                    {folders.map((folder) => (
                      <option key={folder.name} value={folder.name}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <DropZone
            onUploadComplete={fetchMedia}
            selectedFolder={selectedFolder}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
