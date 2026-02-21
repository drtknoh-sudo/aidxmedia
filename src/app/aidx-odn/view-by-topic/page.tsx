import { Metadata } from "next";
import Link from "next/link";
import { ODNPageHeader } from "@/components/community/odn/ODNPageHeader";
import { ODNFooter } from "@/components/community/odn/ODNFooter";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "View by Topic | AIDX ODN",
  description: "Browse AIDX ODN posts organized by topic category.",
};

const TOPIC_CATEGORIES = [
  {
    name: "AI Futures",
    description: "Predictions and scenarios about how AI will reshape civilization.",
    count: 0,
    color: "bg-teal-100 text-teal-700 border-teal-200",
    icon: "🤖",
  },
  {
    name: "Governance",
    description: "AI regulation, policy frameworks, and democratic oversight.",
    count: 0,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "🏛️",
  },
  {
    name: "Economy",
    description: "Economic transformation, job markets, and wealth distribution.",
    count: 0,
    color: "bg-green-100 text-green-700 border-green-200",
    icon: "📈",
  },
  {
    name: "Education",
    description: "How AI is changing learning, teaching, and knowledge creation.",
    count: 0,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: "🎓",
  },
  {
    name: "Labor",
    description: "Workforce displacement, new roles, and the future of work.",
    count: 0,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    icon: "⚙️",
  },
  {
    name: "Healthcare",
    description: "AI in medicine, diagnostics, and public health systems.",
    count: 0,
    color: "bg-red-100 text-red-700 border-red-200",
    icon: "🏥",
  },
  {
    name: "Environment",
    description: "AI's role in climate change, sustainability, and ecology.",
    count: 0,
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: "🌍",
  },
  {
    name: "Ethics",
    description: "Moral questions, bias, fairness, and human dignity in the AI era.",
    count: 0,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: "⚖️",
  },
  {
    name: "Technology",
    description: "Technical advances, breakthroughs, and infrastructure developments.",
    count: 0,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    icon: "💻",
  },
];

export default function ViewByTopicPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ODNPageHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <Layers size={22} className="text-teal-600" />
          <h1 className="text-xl font-bold text-gray-900">View by Topic</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8 ml-9">
          Browse all discussions organized by subject category.
        </p>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPIC_CATEGORIES.map((topic) => (
            <div
              key={topic.name}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{topic.icon}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${topic.color}`}>
                  {topic.count} posts
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{topic.name}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{topic.description}</p>
              <Link
                href={`/aidx-odn?tag=${encodeURIComponent(topic.name)}`}
                className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors"
              >
                Browse {topic.name} →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-[#0F4C81] rounded-xl p-6 text-white text-center">
          <h2 className="text-base font-bold mb-2">Start a Discussion</h2>
          <p className="text-sm text-white/80 mb-4">
            Have insights on AI&apos;s impact? Share your perspective and contribute to the community.
          </p>
          <Link
            href="/aidx-odn/submit"
            className="inline-block px-5 py-2 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Submit a Post
          </Link>
        </div>
      </main>

      <ODNFooter />
    </div>
  );
}
