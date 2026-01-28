"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const navItems = [
  { name: "NEWS", href: "/news" },
  { name: "RESEARCH", href: "/research" },
  { name: "COMMENTARY", href: "/commentary" },
  { name: "ABOUT", href: "/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center gap-4 text-sm text-gray-600">
          <Link href="/subscribe" className="hover:text-primary transition-colors">
            Subscribe
          </Link>
          <Link href="/login" className="hover:text-primary transition-colors">
            Log In
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
              Science Journal
            </h1>
          </Link>

          {/* Search */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
            <Search size={22} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center justify-center gap-8 py-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium tracking-wider hover:text-primary-light transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile nav */}
          {isMenuOpen && (
            <ul className="lg:hidden py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-sm font-medium tracking-wider hover:text-primary-light transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
