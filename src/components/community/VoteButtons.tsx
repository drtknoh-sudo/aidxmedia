"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  score: number;
  userVote: number;
  onVote: (value: number) => Promise<void>;
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function VoteButtons({
  score,
  userVote,
  onVote,
  orientation = "vertical",
  size = "md",
  disabled = false,
}: VoteButtonsProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [optimisticScore, setOptimisticScore] = useState(score);
  const [optimisticVote, setOptimisticVote] = useState(userVote);

  const handleVote = async (value: number) => {
    if (disabled || isVoting) return;

    // Optimistic update
    const previousVote = optimisticVote;
    const previousScore = optimisticScore;

    let newVote: number;
    let scoreDiff: number;

    if (previousVote === value) {
      // Remove vote
      newVote = 0;
      scoreDiff = -value;
    } else if (previousVote === 0) {
      // New vote
      newVote = value;
      scoreDiff = value;
    } else {
      // Change vote
      newVote = value;
      scoreDiff = value * 2; // Remove old vote + add new vote
    }

    setOptimisticVote(newVote);
    setOptimisticScore(previousScore + scoreDiff);
    setIsVoting(true);

    try {
      await onVote(value);
    } catch (error) {
      // Revert on error
      setOptimisticVote(previousVote);
      setOptimisticScore(previousScore);
      console.error("Vote failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const sizeClasses = {
    sm: { icon: 16, text: "text-xs" },
    md: { icon: 20, text: "text-sm" },
    lg: { icon: 24, text: "text-base" },
  };

  const { icon: iconSize, text: textSize } = sizeClasses[size];

  const containerClass = cn(
    "flex items-center gap-1",
    orientation === "vertical" ? "flex-col" : "flex-row"
  );

  return (
    <div className={containerClass}>
      <button
        onClick={() => handleVote(1)}
        disabled={disabled || isVoting}
        className={cn(
          "p-1 rounded transition-colors hover:bg-orange-100",
          optimisticVote === 1
            ? "text-orange-500"
            : "text-gray-400 hover:text-orange-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Upvote"
      >
        <ArrowBigUp
          size={iconSize}
          className={cn(optimisticVote === 1 && "fill-current")}
        />
      </button>

      <span
        className={cn(
          "font-semibold min-w-[2rem] text-center",
          textSize,
          optimisticScore > 0 && "text-orange-500",
          optimisticScore < 0 && "text-blue-500",
          optimisticScore === 0 && "text-gray-500"
        )}
      >
        {optimisticScore}
      </span>

      <button
        onClick={() => handleVote(-1)}
        disabled={disabled || isVoting}
        className={cn(
          "p-1 rounded transition-colors hover:bg-blue-100",
          optimisticVote === -1
            ? "text-blue-500"
            : "text-gray-400 hover:text-blue-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Downvote"
      >
        <ArrowBigDown
          size={iconSize}
          className={cn(optimisticVote === -1 && "fill-current")}
        />
      </button>
    </div>
  );
}
