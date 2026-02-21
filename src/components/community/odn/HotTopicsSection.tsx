"use client";

import Link from "next/link";
import type { Post } from "@/core/entities/types";

const HOT_BG_IMAGES = [
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", // AI brain
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80", // Futuristic
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", // Robot
];

const CARD_LABELS = [
  { label: "Topic of the Month", color: "bg-teal-600" },
  { label: "Most Popular Debate", color: "bg-blue-600" },
  { label: "User Proposed Topic", color: "bg-purple-600" },
];

interface HotTopicCardProps {
  post: Post | null;
  index: number;
}

function HotTopicCard({ post, index }: HotTopicCardProps) {
  const { label, color } = CARD_LABELS[index];
  const bgImage = HOT_BG_IMAGES[index];

  if (!post) {
    return (
      <div className="relative h-56 rounded-xl overflow-hidden bg-gray-800 animate-pulse">
        <div className="absolute inset-0 flex items-end p-4">
          <div className="w-full space-y-2">
            <div className="h-3 bg-gray-700 rounded w-1/3" />
            <div className="h-5 bg-gray-700 rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  const preview = post.content?.slice(0, 100) ?? "";

  return (
    <Link href={`/aidx-odn/post/${post.slug}`} className="block group">
      <div
        className="relative h-56 rounded-xl overflow-hidden bg-gray-900"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Default content (always visible) */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:opacity-0">
          <span
            className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded mb-2 w-fit ${color}`}
          >
            {label}
          </span>
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2">
            {post.title}
          </h3>
        </div>

        {/* Hover overlay (author + summary) */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded mb-2 w-fit ${color}`}
          >
            {label}
          </span>
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-1">
            {post.title}
          </h3>
          <p className="text-white/80 text-xs font-medium mb-1">
            by {post.author?.name ?? "Anonymous"}
          </p>
          <p className="text-white/70 text-xs line-clamp-2">{preview}</p>
        </div>
      </div>
    </Link>
  );
}

interface HotTopicsSectionProps {
  monthlyTopic: Post | null;
  mostPopular: Post | null;
  userProposed: Post | null;
}

export function HotTopicsSection({
  monthlyTopic,
  mostPopular,
  userProposed,
}: HotTopicsSectionProps) {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-5 bg-teal-600 rounded-full inline-block" />
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            Hot Topics
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HotTopicCard post={monthlyTopic} index={0} />
          <HotTopicCard post={mostPopular} index={1} />
          <HotTopicCard post={userProposed} index={2} />
        </div>
      </div>
    </section>
  );
}
