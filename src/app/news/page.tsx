import ArticleCard from "@/components/ArticleCard";
import { getUnifiedPosts } from "@/lib/unified-posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - Trutha ai",
  description: "Latest AI news and verified intelligence updates",
};

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getUnifiedPosts("news");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b-4 border-primary pb-4 mb-8">
        <h1 className="text-4xl font-serif font-bold">News</h1>
        <p className="text-gray-600 mt-2">Latest AI news and verified intelligence updates</p>
      </div>

      {/* Articles Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No news articles published yet.</p>
          <p className="text-gray-400">
            Add MDX files to <code className="bg-gray-100 px-2 py-1 rounded">src/content/news/</code> or
            connect Notion to create news articles.
          </p>
        </div>
      )}
    </div>
  );
}
