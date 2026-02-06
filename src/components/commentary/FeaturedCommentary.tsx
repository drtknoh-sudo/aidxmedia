import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Clock, User } from "lucide-react";

interface FeaturedCommentaryProps {
  post: PostMeta;
}

// Estimate reading time based on word count (average 200 words per minute)
function estimateReadingTime(description: string): number {
  const wordCount = description.split(/\s+/).length;
  // Assume full article is about 10x the description length
  return Math.max(5, Math.ceil((wordCount * 10) / 200));
}

export default function FeaturedCommentary({ post }: FeaturedCommentaryProps) {
  const href = `/commentary/${post.slug}`;
  const readingTime = estimateReadingTime(post.description);

  return (
    <article className="group mb-12">
      <Link href={href} className="block">
        {/* Large Hero Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-200 mb-6">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              unoptimized={post.image.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green to-accent-green/70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent-green text-white text-xs font-bold uppercase tracking-wider rounded">
              Featured Analysis
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl">
          {/* Category */}
          <span className="text-accent-green text-sm font-semibold uppercase tracking-wider">
            Opinion
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4 group-hover:text-accent-green transition-colors leading-tight">
            {post.title}
          </h2>

          {/* Pull Quote Style Description */}
          <blockquote className="border-l-4 border-accent-green pl-4 mb-6">
            <p className="text-xl text-gray-600 italic leading-relaxed line-clamp-3">
              &ldquo;{post.description}&rdquo;
            </p>
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              {post.authorRole && (
                <p className="text-sm text-gray-500">{post.authorRole}</p>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2 text-gray-500 text-sm">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
