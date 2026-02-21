"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { User, TrendingUp, LogIn, UserPlus } from "lucide-react";
import type { Post } from "@/core/entities/types";

interface UserStatusSidebarProps {
  popularPosts: Post[];
}

export function UserStatusSidebar({ popularPosts }: UserStatusSidebarProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return (
    <div className="space-y-4">
      {/* User Status Widget */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-[#0F4C81] px-4 py-3">
          <h3 className="text-white text-sm font-semibold">My Activity</h3>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : isAuthenticated && session?.user ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-teal-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {session.user.name ?? "ODN Member"}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
                <div>
                  <p className="text-base font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Comments</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Votes</p>
                </div>
              </div>
              <Link
                href="/aidx-odn/submit"
                className="mt-3 block text-center px-3 py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                + Submit a Post
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Join the Conversation
                  </p>
                  <p className="text-xs text-gray-500">
                    Sign in to post & vote
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0F4C81] text-white text-xs font-semibold rounded-lg hover:bg-[#0A3A63] transition-colors"
                >
                  <LogIn size={13} />
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <UserPlus size={13} />
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popular Rankings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-[#0F4C81] px-4 py-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-teal-300" />
          <h3 className="text-white text-sm font-semibold">Popular Rankings</h3>
        </div>
        <div className="p-3">
          {popularPosts.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">
              No posts yet. Be the first!
            </p>
          ) : (
            <ol className="space-y-1">
              {popularPosts.slice(0, 5).map((post, i) => (
                <li key={post.id}>
                  <Link
                    href={`/aidx-odn/post/${post.slug}`}
                    className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${
                        i === 0
                          ? "bg-teal-600 text-white"
                          : i === 1
                          ? "bg-blue-500 text-white"
                          : i === 2
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs text-gray-700 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* About ODN */}
      <div className="bg-teal-50 rounded-xl border border-teal-100 p-4">
        <h3 className="text-sm font-bold text-teal-800 mb-2">About AIDX ODN</h3>
        <p className="text-xs text-teal-700 leading-relaxed">
          A community for designing AI-driven futures through open debate.
          Share predictions, propose topics, and earn certification through
          community consensus.
        </p>
        <Link
          href="/services"
          className="mt-3 block text-xs text-teal-600 font-semibold hover:text-teal-800 transition-colors"
        >
          Learn more about our services →
        </Link>
      </div>
    </div>
  );
}
