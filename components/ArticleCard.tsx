import React from "react";
import Link from "next/link";
import { Calendar, CreditCard as Edit, Eye } from "lucide-react";

interface ArticleCardProps {
  id: string;
  name: string;
  excerpt?: string;
  createdAt?: string;
  status?: "published" | "draft";
}

export default function ArticleCard({ 
  id, 
  name, 
  excerpt, 
  createdAt, 
  status = "draft" 
}: ArticleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <Link 
              href={`/${id}`}
              className="hover:text-purple-600 transition-colors"
            >
              {name}
            </Link>
          </h3>
          {excerpt && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1 ml-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === "published" 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {createdAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Link
            href={`/${id}`}
            className="flex items-center space-x-1 px-3 py-1 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
          <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
}