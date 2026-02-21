"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PenSquare, AlertCircle } from "lucide-react";
import { ODNPageHeader } from "@/components/community/odn/ODNPageHeader";
import { HotTopicsSection } from "@/components/community/odn/HotTopicsSection";
import { TagMenu } from "@/components/community/odn/TagMenu";
import { FeedPostItem } from "@/components/community/odn/FeedPostItem";
import { UserStatusSidebar } from "@/components/community/odn/UserStatusSidebar";
import { ODNFooter } from "@/components/community/odn/ODNFooter";
import type { Post } from "@/core/entities/types";

interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
  userVotes: Record<string, number>;
}

const FEED_LIMIT = 7;

export function CommunityFeed() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Feed state
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [activeTag, setActiveTag] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hot topics state
  const [monthlyTopic, setMonthlyTopic] = useState<Post | null>(null);
  const [mostPopular, setMostPopular] = useState<Post | null>(null);
  const [userProposed, setUserProposed] = useState<Post | null>(null);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  // Fetch hot topics from /api/community/posts?sort=hot&limit=20
  const fetchHotTopics = useCallback(async () => {
    try {
      const res = await fetch("/api/community/posts?sort=hot&page=1&limit=20");
      if (!res.ok) return;
      const data: PostsResponse = await res.json();
      const all = data.posts;

      // Card 1: first pinned admin post (Month Topic)
      const pinned = all.find((p) => p.isAdminPost && p.isPinned) ?? all.find((p) => p.isAdminPost) ?? all[0] ?? null;
      setMonthlyTopic(pinned);

      // Card 2: highest score overall
      const topOverall = [...all].sort((a, b) => b.score - a.score)[0] ?? null;
      setMostPopular(topOverall);

      // Card 3: highest score non-admin
      const topUser = [...all].filter((p) => !p.isAdminPost).sort((a, b) => b.score - a.score)[0] ?? null;
      setUserProposed(topUser);

      // Popular rankings sidebar: top 5 by hotScore
      const ranked = [...all].sort((a, b) => (b.hotScore ?? 0) - (a.hotScore ?? 0)).slice(0, 5);
      setPopularPosts(ranked);
    } catch {
      // Hot topics section will show loading state
    }
  }, []);

  // Fetch feed posts (latest 7)
  const fetchFeed = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/community/posts?sort=new&page=1&limit=${FEED_LIMIT}`);
      if (!res.ok) throw new Error("Failed to load posts");
      const data: PostsResponse = await res.json();
      setFeedPosts(data.posts);
      setUserVotes(data.userVotes ?? {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotTopics();
    fetchFeed();
  }, [fetchHotTopics, fetchFeed]);

  const handleVote = async (postId: string, value: number) => {
    try {
      const res = await fetch(`/api/community/posts/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!res.ok) return;
      const result = await res.json();
      setUserVotes((prev) => ({ ...prev, [postId]: result.newValue }));
      setFeedPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, score: result.newScore } : p))
      );
    } catch {
      // silent
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ODN-specific header (sits below the global site Header) */}
      <ODNPageHeader />

      {/* Hot Topics Section */}
      <HotTopicsSection
        monthlyTopic={monthlyTopic}
        mostPopular={mostPopular}
        userProposed={userProposed}
      />

      {/* Main 2-column layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column (70%) */}
          <main className="flex-1 min-w-0">
            {/* Tag menu + Submit button row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <TagMenu activeTag={activeTag} onChange={setActiveTag} />
              {isAuthenticated ? (
                <Link
                  href="/aidx-odn/submit"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <PenSquare size={13} />
                  New Post
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-600 text-xs font-semibold rounded-lg hover:border-teal-400 hover:text-teal-600 transition-colors"
                >
                  <PenSquare size={13} />
                  Sign in to Post
                </Link>
              )}
            </div>

            {/* Feed */}
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={fetchFeed}
                    className="text-xs text-red-600 underline mt-1 hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
                    <div className="w-[110px] h-[80px] bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : feedPosts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenSquare size={28} className="text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-2">
                  No posts yet
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Be the first to share an AI future scenario or debate topic!
                </p>
                {isAuthenticated && (
                  <Link
                    href="/aidx-odn/submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <PenSquare size={15} />
                    Submit First Post
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {feedPosts.slice(0, FEED_LIMIT).map((post, i) => (
                  <FeedPostItem
                    key={post.id}
                    post={post}
                    index={i}
                    userVote={userVotes[post.id] ?? 0}
                    onVote={isAuthenticated ? handleVote : undefined}
                    isAuthenticated={isAuthenticated}
                  />
                ))}
              </div>
            )}

            {/* See More */}
            {feedPosts.length >= FEED_LIMIT && (
              <div className="mt-4 text-center">
                <Link
                  href="/aidx-odn/view-by-topic"
                  className="inline-block px-6 py-2 bg-white border border-gray-300 text-sm text-gray-600 rounded-lg hover:border-teal-400 hover:text-teal-600 transition-colors"
                >
                  View All Posts →
                </Link>
              </div>
            )}
          </main>

          {/* Right sidebar (desktop only) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <UserStatusSidebar popularPosts={popularPosts} />
          </aside>
        </div>

        {/* Sidebar on mobile (below feed) */}
        <div className="lg:hidden mt-6">
          <UserStatusSidebar popularPosts={popularPosts} />
        </div>
      </div>

      <ODNFooter />
    </div>
  );
}
