import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="container mx-auto">
          {userId ? (
            <nav className="navbar bg-base-200 rounded-2xl px-6 justify-between">
              <p>Welcome back</p>
              <Link href="/">Home</Link>
              <UserButton />
            </nav>
            <div className="flex justify-center">{children}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
              <div className="text-2xl font-bold">Heyday Admin</div>
              <div>Please sign in</div>
                <SignInButton />
            </div>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
