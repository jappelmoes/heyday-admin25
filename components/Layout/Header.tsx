import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CMS</span>
            </div>
            <span className="font-bold text-xl">Content Studio</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-purple-600"
          >
            Articles
          </Link>
          <Link 
            href="/media" 
            className="text-sm font-medium transition-colors hover:text-purple-600"
          >
            Media
          </Link>
          <Link 
            href="/settings" 
            className="text-sm font-medium transition-colors hover:text-purple-600"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">D</span>
          </div>
        </div>
      </div>
    </header>
  );
}