import ArticleCard from "@/components/ArticleCard";
import { getUnifiedPosts } from "@/lib/unified-posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research - Trutha ai",
  description: "Latest research papers and AI analysis",
};

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function ResearchPage() {
  const posts = await getUnifiedPosts("research");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b-4 border-accent-blue pb-4 mb-8">
        <h1 className="text-4xl font-serif font-bold">Research</h1>
        <p className="text-gray-600 mt-2">Latest research papers and AI analysis</p>
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
          <p className="text-gray-500 text-lg mb-4">No research papers published yet.</p>
          <p className="text-gray-400">
            Add MDX files to <code className="bg-gray-100 px-2 py-1 rounded">src/content/research/</code> or
            connect Notion to create research papers.
          </p>
        </div>
      )}
    </div>
  );
}
