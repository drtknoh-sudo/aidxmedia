"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PenSquare, AlertTriangle } from "lucide-react";
import { PostCard, SortSelector } from "@/components/community";
import type { Post } from "@/core/entities/types";

type SortOption = "hot" | "new" | "top";

interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
  userVotes: Record<string, number>;
}

export function CommunityFeed() {
  const { data: session, status } = useSession();
  const [sort, setSort] = useState<SortOption>("hot");
  const [posts, setPosts] = useState<Post[]>([]);
  const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = status === "authenticated";

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/community/posts?sort=${sort}&page=${page}&limit=20`
      );

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data: PostsResponse = await response.json();

      // Separate pinned posts
      const pinned = data.posts.filter((p) => p.isPinned);
      const regular = data.posts.filter((p) => !p.isPinned);

      if (page === 1) {
        setPinnedPosts(pinned);
        setPosts(regular);
      } else {
        setPosts((prev) => [...prev, ...regular]);
      }

      setUserVotes(data.userVotes);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [sort, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSortChange = (newSort: SortOption) => {
    if (newSort !== sort) {
      setSort(newSort);
      setPage(1);
      setPosts([]);
      setPinnedPosts([]);
    }
  };

  const handleVote = async (postId: string, value: number) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) throw new Error("Vote failed");

      const result = await response.json();

      // Update local state
      setUserVotes((prev) => ({
        ...prev,
        [postId]: result.newValue,
      }));

      // Update post score
      const updatePostScore = (post: Post) =>
        post.id === postId ? { ...post, score: result.newScore } : post;

      setPosts((prev) => prev.map(updatePostScore));
      setPinnedPosts((prev) => prev.map(updatePostScore));
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">
              AI Dystopia Stories
            </h1>
          </div>
          <p className="text-lg text-orange-100 max-w-2xl">
            Explore and discuss potential AI-driven dystopia scenarios. Share
            your visions of futures where artificial intelligence reshapes
            society—for better or worse.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <SortSelector value={sort} onChange={handleSortChange} />

          {isAuthenticated ? (
            <Link
              href="/aidx-odn/submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              <PenSquare size={18} />
              Submit Story
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              <PenSquare size={18} />
              Log in to Submit
            </Link>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
            {error}
            <button
              onClick={fetchPosts}
              className="ml-2 underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Pinned Admin Posts */}
        {pinnedPosts.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Pinned Posts
            </h2>
            <div className="space-y-3">
              {pinnedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userVote={userVotes[post.id] ?? 0}
                  onVote={isAuthenticated ? handleVote : undefined}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          {pinnedPosts.length > 0 && posts.length > 0 && (
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              All Stories
            </h2>
          )}

          {isLoading && posts.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border p-4 animate-pulse"
                >
                  <div className="flex gap-3">
                    <div className="w-10 space-y-2">
                      <div className="h-6 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-6 bg-gray-200 rounded" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No stories yet
              </h3>
              <p className="text-gray-500 mb-4">
                Be the first to share an AI dystopia scenario!
              </p>
              {isAuthenticated && (
                <Link
                  href="/aidx-odn/submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <PenSquare size={18} />
                  Submit Story
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userVote={userVotes[post.id] ?? 0}
                  onVote={isAuthenticated ? handleVote : undefined}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {page < totalPages && (
            <div className="mt-6 text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="px-6 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
