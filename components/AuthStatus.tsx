"use client";

import React from "react";
import Link from "next/link";

export default function AuthStatus({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="navbar bg-base-200 rounded-2xl px-6 justify-between">
        <p>Welcome back (Dev Mode)</p>
        <Link href="/">Home</Link>
        <div className="btn btn-circle btn-ghost">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
            D
          </div>
        </div>
      </nav>
      <div className="flex justify-center">{children}</div>
    </>
  );
}