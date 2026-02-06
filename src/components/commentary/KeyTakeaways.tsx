import { Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  description: string;
  tags: string[];
}

export default function KeyTakeaways({ description, tags }: KeyTakeawaysProps) {
  // Generate key takeaways from the description
  // In a real app, these would come from the article frontmatter
  const generateTakeaways = (desc: string): string[] => {
    // Simple approach: split long descriptions into bullet points
    // or use the tags as proxies for main topics
    if (tags.length >= 3) {
      return tags.slice(0, 3).map((tag) => `Analysis on ${tag} and its implications`);
    }
    // Fallback: create generic takeaways based on description length
    return [
      desc.length > 100 ? desc.slice(0, 100) + "..." : desc,
    ];
  };

  const takeaways = generateTakeaways(description);

  return (
    <aside className="bg-accent-green/5 border border-accent-green/20 rounded-lg p-6 mb-8">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Lightbulb size={16} className="text-accent-green" />
        Key Takeaways
      </h3>

      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-accent-green/20 text-accent-green text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="text-gray-700 text-sm leading-relaxed">
              {takeaway}
            </span>
          </li>
        ))}
      </ul>

      {tags.length > 0 && (
        <div className="mt-6 pt-4 border-t border-accent-green/20">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Topics Covered
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white border border-accent-green/30 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
