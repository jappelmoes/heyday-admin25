import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AuthStatus from "@/components/AuthStatus";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={inter.className}>
        <body className="container mx-auto">
          <AuthStatus>{children}</AuthStatus>
        </body>
      </html>
    </ClerkProvider>
  );
}
