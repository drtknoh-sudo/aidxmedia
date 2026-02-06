import { Lightbulb } from "lucide-react";

interface KeyFindingsProps {
  tags: string[];
}

export default function KeyFindings({ tags }: KeyFindingsProps) {
  return (
    <aside className="bg-accent-teal/5 border border-accent-teal/20 rounded-lg p-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Lightbulb size={16} className="text-accent-teal" />
        Keywords
      </h3>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white border border-accent-teal/30 text-gray-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No keywords specified</p>
      )}

      <div className="mt-6 pt-6 border-t border-accent-teal/20">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Research Category
        </h4>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-teal text-white text-xs font-semibold rounded">
          Academic Paper
        </span>
      </div>
    </aside>
  );
}
