import { Metadata } from "next";
import Link from "next/link";
import { ODNPageHeader } from "@/components/community/odn/ODNPageHeader";
import { ODNFooter } from "@/components/community/odn/ODNFooter";
import { Calendar, MessageSquare, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Topic of the Month | AIDX ODN",
  description: "The current official monthly debate topic selected by the AIDX ODN team.",
};

export const dynamic = "force-dynamic";

// In production, this would be fetched from DB / CMS
const CURRENT_MONTH_TOPIC = {
  month: "February 2026",
  title: "Will AI-Generated Knowledge Replace Academic Research?",
  subtitle: "Exploring the boundary between AI-assisted and AI-authored scholarship",
  description:
    "As large language models become capable of synthesizing vast bodies of literature, generating hypotheses, and even writing papers, we face a fundamental question: Can AI-generated knowledge attain the same epistemic authority as human-authored academic research? This month, we debate the standards for verification, the role of human judgment, and what it means to 'know' something in the age of generative AI.",
  keyQuestions: [
    "What criteria should determine whether AI-generated research is 'certified' knowledge?",
    "How should academic institutions adapt their peer-review processes?",
    "Is there inherent value in human-authored research that AI cannot replicate?",
    "Who bears responsibility for hallucinations in AI-generated scholarly content?",
  ],
  relatedLinks: [
    { label: "Submit your view on this topic", href: "/aidx-odn/submit" },
    { label: "View past official topics", href: "/aidx-odn/past-topics" },
  ],
  stats: { participants: 0, posts: 0, comments: 0 },
};

export default function TopicOfMonthPage() {
  const { month, title, subtitle, description, keyQuestions, relatedLinks, stats } =
    CURRENT_MONTH_TOPIC;

  return (
    <div className="min-h-screen bg-slate-50">
      <ODNPageHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">
            <Calendar size={11} />
            Official Topic · {month}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
          {title}
        </h1>
        <p className="text-base text-gray-500 mb-6">{subtitle}</p>

        {/* Stats row */}
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-1.5">
            <Users size={14} />
            {stats.participants} participants
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} />
            {stats.posts} posts
          </span>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
            About This Topic
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Key Questions */}
        <div className="bg-[#0F4C81] rounded-xl p-6 mb-6">
          <h2 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-4">
            Key Questions for Debate
          </h2>
          <ul className="space-y-3">
            {keyQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-white/90 leading-relaxed">{q}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-1 text-center px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/aidx-odn"
            className="flex-1 text-center px-5 py-3 bg-white border border-gray-300 hover:border-teal-400 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            View Community Feed
          </Link>
        </div>
      </main>

      <ODNFooter />
    </div>
  );
}
