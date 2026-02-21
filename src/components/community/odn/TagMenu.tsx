"use client";

export const ODN_TAGS = [
  "All",
  "AI Futures",
  "Governance",
  "Economy",
  "Education",
  "Labor",
  "Healthcare",
  "Environment",
  "Ethics",
  "Technology",
];

interface TagMenuProps {
  activeTag: string;
  onChange: (tag: string) => void;
}

export function TagMenu({ activeTag, onChange }: TagMenuProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
      {ODN_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={`flex-shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-full border transition-colors ${
            activeTag === tag
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-teal-400 hover:text-teal-600"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
