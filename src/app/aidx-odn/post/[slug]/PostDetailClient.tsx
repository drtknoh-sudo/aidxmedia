"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { VoteButtons, AdminBadge, ShareButton, CommentThread } from "@/components/community";
import type { Post, Comment } from "@/core/entities/types";

interface PostDetailClientProps {
  initialPost: Post;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostDetailClient({ initialPost }: PostDetailClientProps) {
  const { data: session, status } = useSession();
  const [post, setPost] = useState(initialPost);
  const [userVote, setUserVote] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentVotes, setCommentVotes] = useState<Record<string, number>>({});
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const isAuthenticated = status === "authenticated";

  // Fetch post data with user's vote
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/community/posts/${post.id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setUserVote(data.userVote ?? 0);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();
  }, [post.id]);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    setIsLoadingComments(true);
    try {
      const response = await fetch(`/api/community/posts/${post.id}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
        setCommentVotes(data.userVotes);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  }, [post.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleVote = async (value: number) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${post.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      if (response.ok) {
        const result = await response.json();
        setUserVote(result.newValue);
        setPost((prev) => ({ ...prev, score: result.newScore }));
      }
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  const handleAddComment = async (content: string, parentId?: string) => {
    try {
      const response = await fetch(`/api/community/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parentId }),
      });

      if (response.ok) {
        // Refetch comments to get the updated tree
        await fetchComments();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  };

  const handleCommentVote = async (commentId: string, value: number) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(
        `/api/community/posts/${post.id}/comments/${commentId}/vote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setCommentVotes((prev) => ({
          ...prev,
          [commentId]: result.newValue,
        }));
        // Update comment score in local state
        // This is simplified - in production you'd update the nested structure
        await fetchComments();
      }
    } catch (error) {
      console.error("Comment vote failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/aidx-odn"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Community
        </Link>

        {/* Post Card */}
        <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Post Header */}
          <div className="p-6 border-b">
            <div className="flex gap-4">
              {/* Vote Column */}
              <div className="flex-shrink-0">
                <VoteButtons
                  score={post.score}
                  userVote={userVote}
                  onVote={handleVote}
                  orientation="vertical"
                  size="lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                  {post.isAdminPost && <AdminBadge />}
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author?.name ?? "Anonymous"}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(new Date(post.createdAt))}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                {/* Share */}
                <ShareButton
                  postId={post.id}
                  postSlug={post.slug}
                  postTitle={post.title}
                />
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              {post.content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-6">
            Discussion ({comments.length})
          </h2>

          {isLoadingComments ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <CommentThread
              postId={post.id}
              comments={comments}
              userVotes={commentVotes}
              isAuthenticated={isAuthenticated}
              onAddComment={handleAddComment}
              onVote={handleCommentVote}
            />
          )}
        </section>
      </div>
    </div>
  );
}
