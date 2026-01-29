import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getPostSlugs } from "@/lib/posts";
import { getUnifiedPostBySlug } from "@/lib/unified-posts";
import { formatDate, getCategoryColor, getCategoryLabel } from "@/lib/utils";
import MDXContent from "@/components/MDXContent";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Enable dynamic params for Notion posts
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getPostSlugs("research");
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getUnifiedPostBySlug(slug, "research");

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} - Trutha ai`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function ResearchArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getUnifiedPostBySlug(slug, "research");

  if (!post) {
    notFound();
  }

  return (
    <article className="animate-fade-in">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Research</span>
        </Link>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden bg-gray-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized={post.image.startsWith('http')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded ${getCategoryColor(
            post.category
          )} text-white mb-4`}
        >
          {getCategoryLabel(post.category)}
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-xl text-gray-600 mb-6">{post.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-y border-gray-200 py-4">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>
              {post.author}
              {post.authorRole && (
                <span className="text-gray-400"> · {post.authorRole}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Tag size={16} className="text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none">
          <MDXContent source={post.content} />
        </div>
      </div>

      {/* Share & Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-semibold"
        >
          <ArrowLeft size={18} />
          <span>Back to Research</span>
        </Link>
      </div>
    </article>
  );
}
