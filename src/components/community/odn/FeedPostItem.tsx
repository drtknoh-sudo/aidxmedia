"use client";

import Link from "next/link";
import { MessageSquare, Star, Link as LinkIcon } from "lucide-react";
import { VoteButtons } from "@/components/community/VoteButtons";
import type { Post } from "@/core/entities/types";

// Deterministic thumbnail images per post index
const THUMBNAIL_URLS = [
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&q=75",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&q=75",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&q=75",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=300&q=75",
  "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&q=75",
  "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=300&q=75",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=75",
];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function handleCopyLink(slug: string) {
  const url = `${window.location.origin}/aidx-odn/post/${slug}`;
  navigator.clipboard.writeText(url).catch(() => {});
}

interface FeedPostItemProps {
  post: Post;
  index: number;
  userVote?: number;
  onVote?: (postId: string, value: number) => Promise<void>;
  isAuthenticated?: boolean;
}

export function FeedPostItem({
  post,
  index,
  userVote = 0,
  onVote,
  isAuthenticated = false,
}: FeedPostItemProps) {
  const thumbnail = THUMBNAIL_URLS[index % THUMBNAIL_URLS.length];
  const commentCount = post._count?.comments ?? 0;
  const isCertified = post.isAdminPost;
  const summary = post.content?.slice(0, 120) ?? "";

  const handleVote = async (value: number) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    if (onVote) await onVote(post.id, value);
  };

  return (
    <article className="flex gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-[110px] h-[80px] rounded-lg overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Author + Time */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">
              {post.author?.name ?? "Anonymous"}
            </span>
            <span>·</span>
            <span>{formatTimeAgo(new Date(post.createdAt))}</span>
          </div>

          {/* Title */}
          <Link href={`/aidx-odn/post/${post.slug}`}>
            <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug hover:text-teal-700 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Summary */}
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{summary}</p>
        </div>

        {/* Footer: vote / comments / badge / share */}
        <div className="flex items-center gap-3 mt-2">
          {/* Vote */}
          <VoteButtons
            score={post.score}
            userVote={userVote}
            onVote={handleVote}
            disabled={!onVote}
            orientation="horizontal"
            size="sm"
          />

          {/* Comments */}
          <Link
            href={`/aidx-odn/post/${post.slug}`}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 transition-colors"
          >
            <MessageSquare size={13} />
            <span>{commentCount} {commentCount === 1 ? "comment" : "comments"}</span>
          </Link>

          {/* Certified Badge (only for admin/certified posts) */}
          {isCertified && (
            <span
              className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#FFF8E1", color: "#B8860B" }}
              title="Certified Post"
            >
              <Star size={11} fill="currentColor" />
              Certified
            </span>
          )}

          {/* Share button */}
          <button
            onClick={() => handleCopyLink(post.slug)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 transition-colors ml-auto"
            title="Copy link"
          >
            <LinkIcon size={13} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}
