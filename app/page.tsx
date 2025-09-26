import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import MainLayout from "@/components/Layout/MainLayout";
import ArticleCard from "@/components/ArticleCard";
import { Plus } from "lucide-react";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("content_items")
    .select("id, name, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <MainLayout articles={data || []}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
            <p className="text-gray-600 mt-1">
              Manage and edit your content articles
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Article</span>
          </button>
        </div>

        {/* Articles Grid */}
        {data && data.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <ArticleCard
                key={item.id}
                id={item.id}
                name={item.name}
                createdAt={item.created_at}
                status="draft"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first article.</p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto">
              <Plus className="h-4 w-4" />
              <span>Create Article</span>
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
