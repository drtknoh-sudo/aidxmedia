"use client";

/**
 * ConditionalLayout
 *
 * Wraps Header + main + Footer for all routes EXCEPT /aidx-odn (and its sub-routes).
 * The ODN section uses its own ODNPageHeader / ODNFooter components.
 */

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isODN = pathname.startsWith("/aidx-odn");

  if (isODN) {
    // ODN pages: no global header/footer, full-width, manages its own chrome
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
