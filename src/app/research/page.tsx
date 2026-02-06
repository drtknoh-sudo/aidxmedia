import { ResearchCard } from "@/components/research";
import { getUnifiedPosts } from "@/lib/unified-posts";
import { Metadata } from "next";
import { BookOpen, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Research - Trutha ai",
  description: "Academic papers and professional research reports on AI and technology",
};

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function ResearchPage() {
  const posts = await getUnifiedPosts("research");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page Header - Academic Style */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent-teal/10 rounded-lg">
            <BookOpen size={24} className="text-accent-teal" />
          </div>
          <span className="text-sm font-semibold text-accent-teal uppercase tracking-wider">
            Academic Publications
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Research
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Peer-reviewed papers, technical reports, and in-depth analysis on artificial intelligence,
          machine learning, and emerging technologies.
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <FileText size={16} />
            {posts.length} {posts.length === 1 ? "Paper" : "Papers"} Published
          </span>
        </div>
      </header>

      {/* Research Papers List */}
      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <ResearchCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-4">No research papers published yet.</p>
          <p className="text-gray-400 text-sm">
            Add MDX files to <code className="bg-gray-200 px-2 py-1 rounded">src/content/research/</code> or
            connect Notion to create research papers.
          </p>
        </div>
      )}
    </div>
  );
}
