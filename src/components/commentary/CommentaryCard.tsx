import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { formatDateShort } from "@/lib/utils";
import { Clock, User } from "lucide-react";

interface CommentaryCardProps {
  post: PostMeta;
}

// Estimate reading time based on word count
function estimateReadingTime(description: string): number {
  const wordCount = description.split(/\s+/).length;
  return Math.max(5, Math.ceil((wordCount * 10) / 200));
}

export default function CommentaryCard({ post }: CommentaryCardProps) {
  const href = `/commentary/${post.slug}`;
  const readingTime = estimateReadingTime(post.description);

  return (
    <article className="group">
      <Link href={href} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-200 mb-4">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized={post.image.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/80 to-accent-green/50" />
          )}
        </div>

        {/* Category */}
        <span className="text-accent-green text-xs font-semibold uppercase tracking-wider">
          Commentary
        </span>

        {/* Title */}
        <h3 className="font-serif font-bold text-lg text-gray-900 mt-1 mb-2 group-hover:text-accent-green transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={14} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">{formatDateShort(post.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock size={12} />
            <span>{readingTime} min</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
