import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { getPostSlugs } from "@/lib/posts";
import { getUnifiedPostBySlug } from "@/lib/unified-posts";
import { AuthorProfile, KeyTakeaways } from "@/components/commentary";
import MDXContent from "@/components/MDXContent";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Enable dynamic params for Notion posts
export const dynamicParams = true;

// Estimate reading time
function estimateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.max(5, Math.ceil(wordCount / 200));
}

export async function generateStaticParams() {
  const slugs = getPostSlugs("commentary");
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getUnifiedPostBySlug(slug, "commentary");

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} - Commentary | Trutha ai`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function CommentaryArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getUnifiedPostBySlug(slug, "commentary");

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="animate-fade-in">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link
          href="/commentary"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-green transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Commentary</span>
        </Link>
      </div>

      {/* Article Header - Editorial Style */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-accent-green text-sm font-semibold uppercase tracking-wider">
            Opinion
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-8 text-gray-900">
          {post.title}
        </h1>

        {/* Author Profile Box */}
        <AuthorProfile
          author={post.author}
          authorRole={post.authorRole}
          date={post.date}
          readingTime={readingTime}
        />

        {/* Key Takeaways */}
        <KeyTakeaways description={post.description} tags={post.tags} />
      </header>

      {/* Hero Image */}
      {post.image && (
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized={post.image.startsWith("http")}
            />
          </div>
        </div>
      )}

      {/* Article Content - Editorial Typography */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-a:text-accent-green prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent-green prose-blockquote:bg-accent-green/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-xl">
          <MDXContent source={post.content} />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Link
            href="/commentary"
            className="inline-flex items-center gap-2 text-accent-green hover:text-accent-green/80 transition-colors font-semibold"
          >
            <ArrowLeft size={18} />
            <span>Back to Commentary</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MessageSquare size={16} />
            <span>Trutha ai Commentary</span>
          </div>
        </div>
      </div>
    </article>
  );
}
