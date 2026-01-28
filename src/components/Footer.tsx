import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">
              Science Journal
            </h2>
            <p className="text-gray-400 leading-relaxed">
              과학의 최신 뉴스와 연구 논문을 전달합니다.
              과학적 발견과 혁신적인 연구를 통해 세상을 이해하는 새로운 시각을 제공합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/commentary" className="hover:text-white transition-colors">
                  Commentary
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:contact@sciencejournal.com" className="hover:text-white transition-colors">
                  contact@sciencejournal.com
                </a>
              </li>
              <li>
                <Link href="/submit" className="hover:text-white transition-colors">
                  Submit an Article
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white transition-colors">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Science Journal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
