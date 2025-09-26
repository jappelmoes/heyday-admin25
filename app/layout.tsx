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
  // Debug environment variables
  console.log('CLERK_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="en" className={inter.className}>
        <body className="container mx-auto">
          <AuthStatus>{children}</AuthStatus>
        </body>
      </html>
    </ClerkProvider>
  );
}
