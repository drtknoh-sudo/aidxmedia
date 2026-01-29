import ArticleCard from "@/components/ArticleCard";
import { getUnifiedPosts, getUnifiedFeaturedPosts, getUnifiedLatestPosts } from "@/lib/unified-posts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function Home() {
  const featuredPosts = await getUnifiedFeaturedPosts();
  const latestPosts = await getUnifiedLatestPosts(8);
  const allPosts = await getUnifiedPosts();

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
                <p className="text-gray-500">No articles published yet.</p>
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
                  <p className="text-gray-500 text-sm">No news articles yet.</p>
                )}
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-6 hover:gap-3 transition-all"
              >
                View All News <ArrowRight size={16} />
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
            <h2 className="text-2xl font-sans font-bold">Research & Analysis</h2>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              View All Research <ArrowRight size={16} />
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
                No research papers published yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-sans font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            Get the latest AI news, research insights, and verified intelligence delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-teal"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent-teal hover:bg-teal-600 rounded-lg font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* All Articles */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-sans font-bold mb-8">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.slice(0, 6).map((post) => (
            <ArticleCard key={`${post.category}-${post.slug}`} post={post} />
          ))}
        </div>
        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No articles published yet.</p>
            <p className="text-gray-400 text-sm">
              Add MDX files to the src/content folder or connect Notion to create articles.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
