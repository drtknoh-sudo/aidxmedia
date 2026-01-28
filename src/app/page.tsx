import ArticleCard from "@/components/ArticleCard";
import { getAllPosts, getFeaturedPosts, getLatestPosts } from "@/lib/posts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts(8);
  const allPosts = getAllPosts();

  // Get main featured post and secondary featured posts
  const mainFeatured = featuredPosts[0] || latestPosts[0];
  const secondaryFeatured = featuredPosts.length > 1
    ? featuredPosts.slice(1, 3)
    : latestPosts.slice(1, 3);

  // Get latest news excluding featured
  const latestNews = latestPosts.filter(
    (post) => !featuredPosts.some((f) => f.slug === post.slug)
  ).slice(0, 5);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            {mainFeatured ? (
              <ArticleCard post={mainFeatured} variant="featured" />
            ) : (
              <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">아직 등록된 기사가 없습니다.</p>
              </div>
            )}
          </div>

          {/* Latest News Sidebar */}
          <div className="lg:col-span-1">
            <div className="border-t-4 border-primary pt-4">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Latest News</h2>
              <div className="space-y-4">
                {latestNews.length > 0 ? (
                  latestNews.map((post) => (
                    <ArticleCard key={post.slug} post={post} variant="compact" />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">아직 등록된 뉴스가 없습니다.</p>
                )}
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-6 hover:gap-3 transition-all"
              >
                모든 뉴스 보기 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Featured */}
      {secondaryFeatured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryFeatured.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Research Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">Research Papers</h2>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              모든 연구 보기 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts
              .filter((post) => post.category === "research")
              .slice(0, 3)
              .map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            {allPosts.filter((post) => post.category === "research").length === 0 && (
              <p className="text-gray-500 col-span-3 text-center py-8">
                아직 등록된 연구 논문이 없습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            최신 과학 뉴스와 연구 논문을 이메일로 받아보세요.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition-colors"
            >
              구독하기
            </button>
          </form>
        </div>
      </section>

      {/* All Articles */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-serif font-bold mb-8">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.slice(0, 6).map((post) => (
            <ArticleCard key={`${post.category}-${post.slug}`} post={post} />
          ))}
        </div>
        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">아직 등록된 기사가 없습니다.</p>
            <p className="text-gray-400 text-sm">
              src/content 폴더에 MDX 파일을 추가하여 기사를 작성하세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
