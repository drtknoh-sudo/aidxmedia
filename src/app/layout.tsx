import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Trutha ai - The Standard for Verified AI Knowledge",
  description: "Building trusted standards for AI-driven decision-making. Independent verification, certified datasets, and expert-validated research insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <SessionProvider>
          {/*
           * ConditionalLayout renders <Header> + <main> + <Footer> on all routes
           * EXCEPT /aidx-odn/* where the ODN section manages its own chrome.
           */}
          <ConditionalLayout>{children}</ConditionalLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
