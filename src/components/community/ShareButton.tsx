"use client";

import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  postId: string;
  postSlug: string;
  postTitle: string;
  className?: string;
}

export function ShareButton({
  postId,
  postSlug,
  postTitle,
  className,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/aidx-odn/post/${postSlug}`
      : "";

  const trackShare = async (platform: string) => {
    try {
      await fetch(`/api/community/posts/${postId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });
    } catch (error) {
      console.error("Failed to track share:", error);
    }
  };

  const handleShare = async (platform: string) => {
    await trackShare(platform);

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(postTitle);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }

    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    await trackShare("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors text-sm"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full mb-2 left-0 bg-white border rounded-lg shadow-lg p-2 z-20 min-w-[150px]">
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Twitter size={16} className="text-[#1DA1F2]" />
              Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Facebook size={16} className="text-[#4267B2]" />
              Facebook
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              <Linkedin size={16} className="text-[#0077B5]" />
              LinkedIn
            </button>
            <hr className="my-1" />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Link size={16} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
