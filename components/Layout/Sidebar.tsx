import React from "react";
import Link from "next/link";
import { FileText, Image, Settings, Plus, Search } from "lucide-react";

interface SidebarProps {
  articles?: Array<{ id: string; name: string }>;
}

export default function Sidebar({ articles = [] }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 border-r min-h-screen">
      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Quick Actions
          </h3>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Article</span>
          </button>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Navigation
          </h3>
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>All Articles</span>
          </Link>
          <Link
            href="/media"
            className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Image className="h-4 w-4" />
            <span>Media Library</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Recent Articles */}
        {articles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Recent Articles
            </h3>
            <div className="space-y-1">
              {articles.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  href={`/${article.id}`}
                  className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors truncate"
                >
                  {article.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}