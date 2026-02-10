import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infrastructure/web/auth/auth";
import { PostForm } from "@/components/community";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit Story | AI Dystopia Stories",
  description: "Share your AI dystopia scenario with the community.",
};

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/aidx-odn/submit");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/aidx-odn"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Community
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold mb-2">Submit a Dystopia Story</h1>
          <p className="text-gray-600 mb-6">
            Share your vision of a future where AI impacts society. Describe the
            scenario, its implications, and what we might learn from it.
          </p>

          <PostForm />
        </div>

        {/* Guidelines */}
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h2 className="font-semibold text-orange-800 mb-2">
            Submission Guidelines
          </h2>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Be thoughtful and detailed in your scenario description</li>
            <li>• Consider the social, ethical, and economic implications</li>
            <li>• Cite sources or research if applicable</li>
            <li>• Avoid personal attacks or inflammatory content</li>
            <li>• Focus on constructive exploration of possibilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
