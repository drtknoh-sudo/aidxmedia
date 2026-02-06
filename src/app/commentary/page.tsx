import { FeaturedCommentary, CommentaryCard } from "@/components/commentary";
import { getUnifiedPosts } from "@/lib/unified-posts";
import { Metadata } from "next";
import { MessageSquare, PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Commentary - Trutha ai",
  description: "Expert analysis and insights on AI development, technology policy, and the future",
};

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function CommentaryPage() {
  const posts = await getUnifiedPosts("commentary");

  // Separate featured post from the rest
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const otherPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page Header - Editorial Style */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent-green/10 rounded-lg">
            <MessageSquare size={24} className="text-accent-green" />
          </div>
          <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
            Opinion & Analysis
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Commentary
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Expert insights, analysis, and perspectives on artificial intelligence,
          technology policy, and the evolving relationship between humans and machines.
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <PenLine size={16} />
            {posts.length} {posts.length === 1 ? "Article" : "Articles"} Published
          </span>
        </div>
      </header>

      {posts.length > 0 ? (
        <>
          {/* Featured Commentary */}
          {featuredPost && (
            <section className="mb-12">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-accent-green"></span>
                Featured Analysis
              </h2>
              <FeaturedCommentary post={featuredPost} />
            </section>
          )}

          {/* Latest Commentary - 2 Column Grid */}
          {otherPosts.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-accent-green"></span>
                Latest Commentary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map((post) => (
                  <CommentaryCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-4">No commentary published yet.</p>
          <p className="text-gray-400 text-sm">
            Add MDX files to <code className="bg-gray-200 px-2 py-1 rounded">src/content/commentary/</code> or
            connect Notion to create commentary.
          </p>
        </div>
      )}
    </div>
  );
}
