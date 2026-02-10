"use client";

import Link from "next/link";
import { MessageSquare, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoteButtons } from "./VoteButtons";
import { AdminBadge } from "./AdminBadge";
import { ShareButton } from "./ShareButton";
import type { Post } from "@/core/entities/types";

interface PostCardProps {
  post: Post;
  userVote?: number;
  onVote?: (postId: string, value: number) => Promise<void>;
  isAuthenticated?: boolean;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return new Date(date).toLocaleDateString();
}

export function PostCard({
  post,
  userVote = 0,
  onVote,
  isAuthenticated = false,
}: PostCardProps) {
  const handleVote = async (value: number) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }
    if (onVote) {
      await onVote(post.id, value);
    }
  };

  const commentCount = post._count?.comments ?? 0;

  return (
    <article
      className={cn(
        "flex gap-3 p-4 bg-white rounded-lg border transition-shadow hover:shadow-md",
        post.isAdminPost && "border-orange-300 bg-orange-50/50",
        post.isPinned && "border-l-4 border-l-orange-500"
      )}
    >
      {/* Vote Column */}
      <div className="flex-shrink-0">
        <VoteButtons
          score={post.score}
          userVote={userVote}
          onVote={handleVote}
          disabled={!onVote}
          orientation="vertical"
          size="md"
        />
      </div>

      {/* Content Column */}
      <div className="flex-grow min-w-0">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
          {post.isPinned && (
            <span className="flex items-center gap-1 text-orange-600 font-medium">
              <Pin size={12} />
              Pinned
            </span>
          )}
          {post.isAdminPost && <AdminBadge size="sm" />}
          <span>Posted by</span>
          <span className="font-medium text-gray-700">
            {post.author?.name ?? "Anonymous"}
          </span>
          <span>•</span>
          <span>{formatTimeAgo(new Date(post.createdAt))}</span>
        </div>

        {/* Title */}
        <Link href={`/aidx-odn/post/${post.slug}`}>
          <h2 className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Preview */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{post.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-3">
          <Link
            href={`/aidx-odn/post/${post.slug}`}
            className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors text-sm"
          >
            <MessageSquare size={16} />
            <span>
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </span>
          </Link>

          <ShareButton
            postId={post.id}
            postSlug={post.slug}
            postTitle={post.title}
          />
        </div>
      </div>
    </article>
  );
}
