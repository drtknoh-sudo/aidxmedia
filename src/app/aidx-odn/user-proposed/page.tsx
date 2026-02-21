import { Metadata } from "next";
import Link from "next/link";
import { ODNPageHeader } from "@/components/community/odn/ODNPageHeader";
import { ODNFooter } from "@/components/community/odn/ODNFooter";
import { Lightbulb, ThumbsUp, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "User Proposed Topics | AIDX ODN",
  description: "Community-suggested debate topics for public discussion on AIDX ODN.",
};

// Placeholder proposals — in production, fetch from DB
const SAMPLE_PROPOSALS = [
  {
    id: 1,
    title: "Is Universal Basic Income the only viable solution to AI-driven unemployment?",
    proposedBy: "ODN Member",
    votes: 24,
    comments: 8,
    summary:
      "With automation accelerating across sectors, UBI is gaining traction. But is it truly the right answer, or are there better-designed alternatives?",
  },
  {
    id: 2,
    title: "Should AI systems be required to disclose their training data sources?",
    proposedBy: "ODN Member",
    votes: 18,
    comments: 5,
    summary:
      "Transparency in AI training could prevent misuse, but raises questions about competitive secrets and copyright in the data supply chain.",
  },
  {
    id: 3,
    title: "Can human creativity survive the age of generative AI?",
    proposedBy: "ODN Member",
    votes: 31,
    comments: 14,
    summary:
      "As AI art, music, and writing proliferate, we debate whether human creative expression retains intrinsic value and how the market for creativity will evolve.",
  },
];

export default function UserProposedPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ODNPageHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb size={22} className="text-teal-600" />
          <h1 className="text-xl font-bold text-gray-900">User Proposed Topics</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8 ml-9">
          Community members can propose public debate topics. Vote on proposals to help
          surface the most important questions for the AIDX ODN community.
        </p>

        {/* How it works */}
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 flex gap-3">
          <Lightbulb size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-teal-800 mb-1">How This Works</p>
            <p className="text-xs text-teal-700 leading-relaxed">
              Anyone can propose a debate topic by submitting a post. Proposals that gain
              enough community votes may be selected as an official monthly topic by the AIDX
              ODN team. Propose thoughtfully — the best debates shape our understanding of
              the AI transition.
            </p>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4 mb-8">
          {SAMPLE_PROPOSALS.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Vote count */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-1">
                  <button className="p-1.5 rounded-md hover:bg-teal-50 text-gray-400 hover:text-teal-600 transition-colors">
                    <ThumbsUp size={15} />
                  </button>
                  <span className="text-sm font-bold text-gray-700">{proposal.votes}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
                    {proposal.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {proposal.summary}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>Proposed by {proposal.proposedBy}</span>
                    <span>·</span>
                    <span>{proposal.comments} comments</span>
                  </div>
                </div>

                <Link
                  href="/aidx-odn"
                  className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors mt-1"
                >
                  Discuss <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Propose a topic CTA */}
        <div className="bg-[#0F4C81] rounded-xl p-6 text-white text-center">
          <h2 className="text-base font-bold mb-2">Propose a Debate Topic</h2>
          <p className="text-sm text-white/80 mb-4">
            Have a question about AI&apos;s impact that deserves community debate?
            Submit it and let the community vote.
          </p>
          <Link
            href="/aidx-odn/submit"
            className="inline-block px-5 py-2 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Propose a Topic
          </Link>
        </div>
      </main>

      <ODNFooter />
    </div>
  );
}
