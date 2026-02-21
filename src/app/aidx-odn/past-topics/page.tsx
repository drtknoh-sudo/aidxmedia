import { Metadata } from "next";
import Link from "next/link";
import { ODNPageHeader } from "@/components/community/odn/ODNPageHeader";
import { ODNFooter } from "@/components/community/odn/ODNFooter";
import { Archive, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Past Official Topics | AIDX ODN",
  description: "Archive of all past official monthly debate topics from AIDX ODN.",
};

// Placeholder archive data — in production, fetch from DB
const PAST_TOPICS = [
  {
    month: "January 2026",
    title: "Should AI Systems Have Legal Personhood?",
    postCount: 12,
    summary:
      "An exploration of whether advanced AI agents should be granted limited legal standing and what rights or responsibilities that might entail.",
  },
  {
    month: "December 2025",
    title: "The End of Expertise? How AI is Reshaping Professional Authority",
    postCount: 9,
    summary:
      "Debating whether AI erodes or enhances expert credibility across medicine, law, education, and engineering.",
  },
  {
    month: "November 2025",
    title: "Who Owns AI-Generated Content? Copyright in the Generative Age",
    postCount: 7,
    summary:
      "Examining intellectual property frameworks and who—if anyone—holds rights to content created by AI systems.",
  },
];

export default function PastTopicsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ODNPageHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <Archive size={22} className="text-teal-600" />
          <h1 className="text-xl font-bold text-gray-900">Past Official Topics</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8 ml-9">
          Browse all previous monthly debate topics curated by the AIDX ODN team.
        </p>

        {/* Archive List */}
        {PAST_TOPICS.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <Archive size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No past topics yet. Check back after the first month!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {PAST_TOPICS.map((topic, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                      {topic.month}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      {topic.summary}
                    </p>
                    <span className="text-xs text-gray-400">
                      {topic.postCount} community posts
                    </span>
                  </div>
                  <Link
                    href="/aidx-odn"
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors mt-1"
                  >
                    View <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current month CTA */}
        <div className="mt-8 bg-[#0F4C81] rounded-xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-teal-300 uppercase tracking-wide mb-1">
              Current Topic
            </p>
            <p className="text-sm font-bold">
              Will AI-Generated Knowledge Replace Academic Research?
            </p>
          </div>
          <Link
            href="/aidx-odn/topic-of-month"
            className="flex-shrink-0 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
          >
            Join the Debate →
          </Link>
        </div>
      </main>

      <ODNFooter />
    </div>
  );
}
