import { Quote } from "lucide-react";

interface PullQuoteProps {
  quote: string;
  author?: string;
}

export default function PullQuote({ quote, author }: PullQuoteProps) {
  return (
    <blockquote className="relative my-8 py-8 px-6 bg-gradient-to-r from-accent-green/5 to-transparent border-l-4 border-accent-green">
      {/* Quote Icon */}
      <div className="absolute -top-4 left-4">
        <div className="w-8 h-8 rounded-full bg-accent-green flex items-center justify-center">
          <Quote size={16} className="text-white" />
        </div>
      </div>

      {/* Quote Text */}
      <p className="text-xl md:text-2xl font-serif text-gray-800 italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution */}
      {author && (
        <footer className="mt-4">
          <cite className="text-sm font-medium text-accent-green not-italic">
            — {author}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}
