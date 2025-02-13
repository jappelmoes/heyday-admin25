'use client';

import React from 'react'
import DropZone from './DropZone';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Editor } from '@tiptap/react';

// Add this type for our media items
type MediaItem = {
  id: string;
  name: string;
  path: string;
  created_at: string;
};

export default function MediaZone({ editor }: { editor: Editor }) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const supabase = createClient();

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setMediaItems(data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Media Zone</h1>
      <p className="text-sm text-gray-500">Upload your media files here</p>
      <DropZone onUploadComplete={fetchMedia} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-6">
        {mediaItems.map((item) => (
          <div key={item.id} className="aspect-square"
            onClick={() => {
              editor.chain().focus().setImage({ src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${item.path}` }).run();
            }}
          >
            
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${item.path}`}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
