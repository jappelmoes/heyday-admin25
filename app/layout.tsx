import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="container mx-auto">
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
        </body>
      </html>
    </ClerkProvider>
  );
}
