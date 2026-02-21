import Link from "next/link";

const ODN_LINKS = [
  { label: "ODN Home", href: "/aidx-odn" },
  { label: "View by Topic", href: "/aidx-odn/view-by-topic" },
  { label: "Topic of the Month", href: "/aidx-odn/topic-of-month" },
  { label: "Past Official Topics", href: "/aidx-odn/past-topics" },
  { label: "User Proposed Topics", href: "/aidx-odn/user-proposed" },
];

const SITE_LINKS = [
  { label: "Main Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Research Papers", href: "/research" },
  { label: "Commentary", href: "/commentary" },
  { label: "Services", href: "/services" },
];

const HELP_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "About AIDX ODN", href: "/services" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function ODNFooter() {
  return (
    <footer className="bg-[#0A3A63] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Column 1: ODN Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3">
              AIDX ODN
            </h4>
            <ul className="space-y-1.5">
              {ODN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Site Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3">
              Trutha ai
            </h4>
            <ul className="space-y-1.5">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3">
              Support
            </h4>
            <ul className="space-y-1.5">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} AIDX Modeling Open Design Network — Trutha ai
          </p>
          <p className="text-xs text-white/40">
            The Standard for Verified AI Knowledge
          </p>
        </div>
      </div>
    </footer>
  );
}
