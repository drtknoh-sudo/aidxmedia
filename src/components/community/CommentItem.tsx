"use client";

import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoteButtons } from "./VoteButtons";
import { AdminBadge } from "./AdminBadge";
import type { Comment } from "@/core/entities/types";

interface CommentItemProps {
  comment: Comment;
  userVote?: number;
  userVotes?: Record<string, number>;
  onVote?: (commentId: string, value: number) => Promise<void>;
  onReply?: (parentId: string, content: string) => Promise<void>;
  isAuthenticated?: boolean;
  maxDepth?: number;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString();
}

export function CommentItem({
  comment,
  userVote = 0,
  userVotes = {},
  onVote,
  onReply,
  isAuthenticated = false,
  maxDepth = 6,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleVote = async (value: number) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    if (onVote) {
      await onVote(comment.id, value);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !onReply) return;

    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyContent.trim());
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Failed to reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;
  const canReply = comment.depth < maxDepth;

  return (
    <div className={cn("border-l-2 border-gray-200 pl-3", comment.depth > 0 && "ml-4")}>
      {/* Comment Header */}
      <div className="flex items-start gap-2">
        {/* Vote Buttons - Horizontal for comments */}
        <VoteButtons
          score={comment.score}
          userVote={userVote}
          onVote={handleVote}
          disabled={!onVote}
          orientation="horizontal"
          size="sm"
        />

        <div className="flex-grow min-w-0">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-700">
              {comment.author?.name ?? "Anonymous"}
            </span>
            {comment.author?.role === "ADMIN" && <AdminBadge size="sm" />}
            <span>•</span>
            <span>{formatTimeAgo(new Date(comment.createdAt))}</span>
          </div>

          {/* Content */}
          {!isCollapsed && (
            <>
              <p className="text-gray-800 text-sm mt-1 whitespace-pre-wrap">
                {comment.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-2">
                {canReply && isAuthenticated && (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    <MessageSquare size={12} />
                    Reply
                  </button>
                )}
                {hasReplies && (
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    {isCollapsed ? (
                      <>
                        <ChevronDown size={12} />
                        Show {comment.replies?.length} replies
                      </>
                    ) : (
                      <>
                        <ChevronUp size={12} />
                        Hide replies
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Reply Form */}
              {isReplying && (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleReply}
                      disabled={isSubmitting || !replyContent.trim()}
                      className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                      {isSubmitting ? "Posting..." : "Reply"}
                    </button>
                    <button
                      onClick={() => {
                        setIsReplying(false);
                        setReplyContent("");
                      }}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {!isCollapsed && hasReplies && (
        <div className="mt-3 space-y-3">
          {comment.replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              userVote={userVotes[reply.id] ?? 0}
              userVotes={userVotes}
              onVote={onVote}
              onReply={onReply}
              isAuthenticated={isAuthenticated}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
}
