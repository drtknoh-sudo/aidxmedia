import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { formatDateShort, getCategoryColor, getCategoryLabel } from "@/lib/utils";

interface ArticleCardProps {
  post: PostMeta;
  variant?: "default" | "featured" | "compact";
}

export default function ArticleCard({ post, variant = "default" }: ArticleCardProps) {
  const href = `/${post.category}/${post.slug}`;

  if (variant === "featured") {
    return (
      <article className="group relative">
        <Link href={href} className="block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-200">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded ${getCategoryColor(post.category)} mb-3`}>
                {getCategoryLabel(post.category)}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-primary-light transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                {post.description}
              </p>
              <div className="text-xs text-gray-400">
                <span>{post.author}</span>
                <span className="mx-2">|</span>
                <time dateTime={post.date}>{formatDateShort(post.date)}</time>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group border-b border-gray-100 pb-4 last:border-0">
        <Link href={href} className="flex gap-4">
          {post.image && (
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-gray-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${getCategoryColor(post.category)} text-white mb-1`}>
              {getCategoryLabel(post.category)}
            </span>
            <h3 className="font-serif font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <time dateTime={post.date} className="text-xs text-gray-500 mt-1 block">
              {formatDateShort(post.date)}
            </time>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-200 mb-4">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
          )}
        </div>
        <span className={`inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded ${getCategoryColor(post.category)} text-white mb-2`}>
          {getCategoryLabel(post.category)}
        </span>
        <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.description}
        </p>
        <div className="text-xs text-gray-500">
          <span>{post.author}</span>
          <span className="mx-2">|</span>
          <time dateTime={post.date}>{formatDateShort(post.date)}</time>
        </div>
      </Link>
    </article>
  );
}
