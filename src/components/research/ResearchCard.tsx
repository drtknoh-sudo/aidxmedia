import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { FileText, Calendar, User } from "lucide-react";

interface ResearchCardProps {
  post: PostMeta;
}

export default function ResearchCard({ post }: ResearchCardProps) {
  const href = `/research/${post.slug}`;

  return (
    <article className="group border-b border-gray-200 pb-8 last:border-0">
      <Link href={href} className="block">
        {/* Header with category badge and date */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-accent-teal text-white">
            <FileText size={12} />
            Research Paper
          </span>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar size={14} />
            <time dateTime={post.date}>{formatDate(post.date, "MMMM yyyy")}</time>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
          {post.title}
        </h2>

        {/* Author info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <User size={14} />
          <span className="font-medium">{post.author}</span>
          {post.authorRole && (
            <>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{post.authorRole}</span>
            </>
          )}
        </div>

        {/* Abstract preview */}
        <div className="bg-gray-50 border-l-4 border-accent-teal p-4 mb-4">
          <p className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
            Abstract
          </p>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more link */}
        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:text-primary-dark transition-colors">
          <FileText size={16} />
          <span>Read Full Paper</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </Link>
    </article>
  );
}
