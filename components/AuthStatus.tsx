"use client";

import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function AuthStatus({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <nav className="navbar bg-base-200 rounded-2xl px-6 justify-between">
          <p>Welcome back</p>
          <Link href="/">Home</Link>
          <UserButton />
        </nav>
        <div className="flex justify-center">{children}</div>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="text-2xl font-bold">Heyday Admin</div>
          <div>Please sign in</div>
          <SignInButton />
        </div>
      </SignedOut>
    </>
  );
}