import React from 'react'
import { createClient } from '@/utils/supabase/server'
import TipTap from '@/components/TipTap';
import MediaZone from '@/components/MediaZone';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params;
  const articleId = article;
  const supabase = await createClient();
  const { data, error } = await supabase.from("content_items").select("*").eq("id", articleId);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div>Article not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <TipTap content={data[0].content} />
    </div>
  )
}
