import React from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import TipTap from '@/components/TipTap'
import MainLayout from '@/components/Layout/MainLayout'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { article: string } }) {
  const { article } = params;
  const articleId = article;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", articleId);
  
  if (error) {
    return (
      <MainLayout showSidebar={false}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <MainLayout showSidebar={false}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const article_data = data[0];

  return (
    <MainLayout showSidebar={false}>
      <div className="space-y-6">
        {/* Article Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{article_data.name}</h1>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(article_data.updated_at || article_data.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
}

        {/* Editor */}
        <div className="bg-white rounded-lg border">
          <TipTap content={article_data.content} />
        </div>
      </div>
    </MainLayout>
  );
}