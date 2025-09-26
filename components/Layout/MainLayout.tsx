import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  articles?: Array<{ id: string; name: string }>;
}

export default function MainLayout({ 
  children, 
  showSidebar = true, 
  articles = [] 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        {showSidebar && <Sidebar articles={articles} />}
        <main className={`flex-1 ${showSidebar ? 'ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}