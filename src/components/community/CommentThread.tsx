"use client";

import { useState } from "react";
import { CommentItem } from "./CommentItem";
import type { Comment } from "@/core/entities/types";

interface CommentThreadProps {
  postId: string;
  comments: Comment[];
  userVotes: Record<string, number>;
  isAuthenticated: boolean;
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onVote: (commentId: string, value: number) => Promise<void>;
}

export function CommentThread({
  postId,
  comments,
  userVotes,
  isAuthenticated,
  onAddComment,
  onVote,
}: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    await onAddComment(content, parentId);
  };

  return (
    <div className="space-y-6">
      {/* New Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts on this dystopia scenario..."
            rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">
            <a href="/login" className="text-orange-600 hover:underline font-medium">
              Log in
            </a>{" "}
            to join the discussion
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              userVote={userVotes[comment.id] ?? 0}
              userVotes={userVotes}
              onVote={onVote}
              onReply={handleReply}
              isAuthenticated={isAuthenticated}
            />
          ))
        )}
      </div>
    </div>
  );
}
