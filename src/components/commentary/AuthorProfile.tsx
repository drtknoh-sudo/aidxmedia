import { User, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface AuthorProfileProps {
  author: string;
  authorRole?: string;
  date: string;
  readingTime?: number;
}

export default function AuthorProfile({
  author,
  authorRole,
  date,
  readingTime = 8,
}: AuthorProfileProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        {/* Author Avatar */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User size={32} className="text-gray-400" />
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{author}</h3>
          {authorRole && (
            <p className="text-accent-green font-medium text-sm mb-2">
              {authorRole}
            </p>
          )}
          <p className="text-gray-600 text-sm leading-relaxed">
            Expert contributor at Trutha ai, providing analysis and insights on
            artificial intelligence, technology policy, and the future of human-AI collaboration.
          </p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={14} />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>{readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}
