"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";

const GLOBAL_LINKS = [
  { label: "Main Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Research", href: "/research" },
  { label: "Commentary", href: "/commentary" },
  { label: "Services", href: "/services" },
];

const LOCAL_NAV = [
  { label: "ODN Home", href: "/aidx-odn" },
  { label: "View by Topic", href: "/aidx-odn/view-by-topic" },
  { label: "Topic of the Month", href: "/aidx-odn/topic-of-month" },
  { label: "Past Official Topics", href: "/aidx-odn/past-topics" },
  { label: "User Proposed Topics", href: "/aidx-odn/user-proposed" },
];

export function ODNPageHeader() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/aidx-odn?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const isActive = (href: string) => {
    if (href === "/aidx-odn") return pathname === "/aidx-odn";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-[#0F4C81] text-white shadow-lg">
      {/* Row 1: Logo + Search + Global Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center gap-3">
        {/* Logo */}
        <Link href="/aidx-odn" className="flex-shrink-0 leading-tight">
          <div className="text-[15px] font-bold text-teal-300 tracking-wide">
            AIDX Modeling
          </div>
          <div className="text-[13px] font-semibold text-white/90 tracking-wide">
            Open Design Network
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-xl flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden hover:border-white/40 focus-within:border-teal-300 transition-colors"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search discussions, topics, posts..."
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-white/50 text-sm outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 text-white/70 hover:text-white transition-colors"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Global Shortcuts */}
        <nav className="flex items-center gap-1 flex-wrap">
          {GLOBAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Row 2: ODN Local Nav */}
      <div className="border-t border-white/15 bg-[#0A3A63]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {LOCAL_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive(item.href)
                    ? "border-teal-300 text-teal-300"
                    : "border-transparent text-white/70 hover:text-white hover:border-white/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
