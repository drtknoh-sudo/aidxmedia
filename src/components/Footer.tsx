import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-sans mb-4">
              <span className="font-bold text-white">Trutha</span>
              <span className="font-light text-primary-light ml-0.5">ai</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Building trusted standards for AI-driven decision-making.
              An independent verification platform that brings transparency,
              accountability, and evidence-based insights to the age of artificial intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/news" className="hover:text-accent-teal transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-accent-teal transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/commentary" className="hover:text-accent-teal transition-colors">
                  Commentary
                </Link>
              </li>
              <li>
                <Link href="/aidx-odn" className="hover:text-accent-teal transition-colors">
                  AIDX ODN
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-teal transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:contact@trutha.ai" className="hover:text-accent-teal transition-colors">
                  contact@trutha.ai
                </a>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-teal transition-colors">
                  Request Consultation
                </Link>
              </li>
              <li>
                <Link href="/aidx-odn" className="hover:text-accent-teal transition-colors">
                  ODN Platform
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Trutha ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
