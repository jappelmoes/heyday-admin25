'use client';

import React from 'react'
import DropZone from './DropZone';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
// Add this type for our media items
type MediaItem = {
  id: string;
  name: string;
  path: string;
  created_at: string;
};

export default function MediaZone() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setMediaItems(data);
    };

    fetchMedia();
  }, []);

  return (
    <div>
      <h1>Media Zone</h1>
      <p>Upload your media files here</p>
      <DropZone />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {mediaItems.map((item) => (
          <div key={item.id} className="aspect-square">
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
