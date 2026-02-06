import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, FileText, BookOpen } from "lucide-react";
import { getPostSlugs } from "@/lib/posts";
import { getUnifiedPostBySlug } from "@/lib/unified-posts";
import { formatDate } from "@/lib/utils";
import { AbstractSection, KeyFindings } from "@/components/research";
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
    return { title: "Paper Not Found" };
  }

  return {
    title: `${post.title} - Research | Trutha ai`,
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-teal transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Research</span>
        </Link>
      </div>

      {/* Article Header - Academic Style */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-accent-teal text-white">
            <FileText size={12} />
            Research Paper
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6 text-gray-900">
          {post.title}
        </h1>

        {/* Author and Date Info - Academic Style */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-y border-gray-200 py-4 mb-8">
          <div className="flex items-center gap-2">
            <User size={16} className="text-accent-teal" />
            <span className="font-medium">{post.author}</span>
            {post.authorRole && (
              <span className="text-gray-400">· {post.authorRole}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-accent-teal" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>

        {/* Two Column Layout: Abstract + Key Findings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AbstractSection description={post.description} />
          </div>
          <div className="lg:col-span-1">
            <KeyFindings tags={post.tags} />
          </div>
        </div>
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

      {/* Article Content - Academic Typography */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-accent-teal prose-a:no-underline hover:prose-a:underline">
          <MDXContent source={post.content} />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-accent-teal hover:text-accent-teal/80 transition-colors font-semibold"
          >
            <ArrowLeft size={18} />
            <span>Back to Research</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <BookOpen size={16} />
            <span>Trutha ai Research</span>
          </div>
        </div>
      </div>
    </article>
  );
}
