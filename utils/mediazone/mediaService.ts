import { createClient } from "@/utils/supabase/client";

export type MediaItem = {
  id: string;
  name: string;
  path: string;
  folder?: string | null;
  created_at: string;
};

export type MediaFolder = {
  name: string;
  created_at: string;
};

const supabase = createClient();

export const mediaService = {
  async getFolders() {
    const { data, error } = await supabase
      .from("media_folders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getMedia(selectedFolder: string = "") {
    const query = supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (selectedFolder) {
      query.eq("folder", selectedFolder);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async uploadFile(file: File, folder: string): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response.json();
  },

  async moveFile(fileId: string, newFolder: string): Promise<void> {
    const { data: file, error: fileError } = await supabase
      .from("media")
      .select("*")
      .eq("id", fileId)
      .single();

    if (!file) throw new Error("File not found");

    const { error: moveError } = await supabase.storage
      .from("media")
      .move(`${file.folder}/${file.name}`, `${newFolder}/${file.name}`);

    if (moveError) throw moveError;

    const { error: updateError } = await supabase
      .from("media")
      .update({ folder: newFolder })
      .eq("id", fileId);

    if (updateError) throw updateError;
  },
};
