import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Network, Brain, Users, Shield, Lightbulb, Globe, MessageSquare, Tag, FileCheck, Archive } from "lucide-react";

export const metadata: Metadata = {
  title: "AIDX ODN - Open Design Network | Trutha ai",
  description: "AIDX Modeling Open Design Network - Design the future, verify through society, archive the consensus. A human-centered future design and verification platform.",
};

export default function AidxOdnPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-accent-teal/20 text-accent-teal rounded-full text-sm font-medium mb-4">
              Open Design Network
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AIDX Modeling ODN
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              A human-centered future design and verification methodology platform.
            </p>
            <p className="text-lg text-gray-400 mb-8 italic">
              "Design the future first, let society verify acceptance or rejection, and archive the validated records."
            </p>
            <a
              href="https://odn.dinnomix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-teal hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Visit ODN Platform <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* What is ODN */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What is AIDX ODN?</h2>
            <p className="text-lg text-gray-600">
              The Open Design Network (ODN) is not just a platform—it is a
              <strong> standard-setting and verification logging system</strong> that enables
              collaborative design of AI-driven social transformation scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Network className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Participatory Verification</h3>
              <p className="text-gray-600">
                Enable cross-validation through expert HITL (Human-in-the-Loop) processes,
                ensuring AI analysis results meet rigorous verification standards.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-accent-teal" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Scenario Engine</h3>
              <p className="text-gray-600">
                Generate long-horizon future scenarios that calculate causal relationships
                in social systems, from healthcare to education to labor markets.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-accent-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Truth Dataset</h3>
              <p className="text-gray-600">
                Build verified knowledge bases through recorded judgment processes
                and data provenance, creating sovereign truth datasets for nations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Components */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Six Core Components</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The ODN operates through six essential components that form the foundation of human-centered future design and collective verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="text-primary" size={24} />
                <h3 className="text-lg font-bold">1. Future Prompt</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Open-ended questions about the future that initiate the design process. Every scenario begins with a thought-provoking prompt.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent-teal">
              <div className="flex items-center gap-3 mb-3">
                <FileCheck className="text-accent-teal" size={24} />
                <h3 className="text-lg font-bold">2. Future Design Card</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Standardized blueprint format capturing scenarios, AI roles, human roles, decision authority, dignity boundaries, and value alignment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent-green">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-accent-green" size={24} />
                <h3 className="text-lg font-bold">3. Structured Feedback</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Not simple voting but conditional agreement/rejection structure that captures nuanced perspectives and diverse viewpoints.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent-gold">
              <div className="flex items-center gap-3 mb-3">
                <Tag className="text-accent-gold" size={24} />
                <h3 className="text-lg font-bold">4. Tagging</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Content categorization and metadata management enabling systematic organization and retrieval of design artifacts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="text-primary" size={24} />
                <h3 className="text-lg font-bold">5. Expert Review Board</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Asynchronous multidisciplinary expert verification separate from general voting, ensuring professional scrutiny.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent-teal">
              <div className="flex items-center gap-3 mb-3">
                <Archive className="text-accent-teal" size={24} />
                <h3 className="text-lg font-bold">6. Knowledge Archive</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Version-controlled history tracking all changes, rationales, and contributors—enabling knowledge evolution like software (v0.1→v1.0→v2.0).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Stage Flow */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Three-Stage Operational Flow</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="bg-primary text-white p-6 rounded-lg text-center w-full md:w-64">
              <div className="text-3xl font-bold mb-2">Design</div>
              <p className="text-sm text-gray-300">Users create Future Design Cards based on prompts</p>
            </div>

            <ArrowRight className="hidden md:block text-gray-400" size={32} />
            <div className="md:hidden text-gray-400 rotate-90">↓</div>

            <div className="bg-accent-teal text-white p-6 rounded-lg text-center w-full md:w-64">
              <div className="text-3xl font-bold mb-2">Feedback</div>
              <p className="text-sm text-gray-300">Community provides structured conditional feedback</p>
            </div>

            <ArrowRight className="hidden md:block text-gray-400" size={32} />
            <div className="md:hidden text-gray-400 rotate-90">↓</div>

            <div className="bg-accent-green text-white p-6 rounded-lg text-center w-full md:w-64">
              <div className="text-3xl font-bold mb-2">Archive</div>
              <p className="text-sm text-gray-300">Expert verification → Truth Dataset integration → Versioning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Platform Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Future Scenario Simulation</h3>
                <p className="text-gray-600">
                  Not a game, but a tool for calculating social causality. Simulate AI adoption impacts
                  across sectors—job displacement, ethical responsibility emergence, and more.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="text-accent-teal" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Social Consensus Building</h3>
                <p className="text-gray-600">
                  Enable stakeholders to participate in designing transition pathways,
                  turning complex policy decisions into collaborative intelligence.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="text-accent-green" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Verification Infrastructure</h3>
                <p className="text-gray-600">
                  Every analysis, every judgment, every recommendation is logged with full
                  evidence trails, creating an auditable record of AI-assisted decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Sovereign Data Standards</h3>
                <p className="text-gray-600">
                  Build national-level truth datasets that serve as the foundation for
                  trustworthy AI governance and policy-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore the Future?</h2>
          <p className="text-gray-400 mb-8">
            Join the Open Design Network and participate in shaping AI-driven social transformation.
            Access scenario simulations, contribute to verification processes, and build the truth infrastructure of tomorrow.
          </p>
          <a
            href="https://odn.dinnomix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-teal hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Visit ODN Platform <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
