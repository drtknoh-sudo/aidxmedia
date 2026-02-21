import { Metadata } from "next";
import Link from "next/link";
import {
  FileSearch,
  Shield,
  FileCheck,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
  Mail,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services - AIDX Consulting & Design Studio | Trutha.ai",
  description: "Professional AI verification, consulting, and design studio services. News Intelligence, AI Auditor, Truth Verification, and certified dataset services.",
};

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-accent-teal/20 text-accent-teal rounded-full text-sm font-medium mb-4">
              Professional Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AIDX Consulting & Design Studio
            </h1>
            <p className="text-xl text-gray-300">
              Designing accountability for the age of AI. We help organizations
              verify, document, and certify AI-driven decisions with full evidence trails.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From news intelligence to AI auditing, we provide comprehensive
              verification and accountability services for the AI era.
            </p>
          </div>

          {/* Service 1: News Intelligence Engine */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileSearch className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold">News Intelligence Engine</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6">
                  Transform raw news into actionable intelligence. Our system collects,
                  analyzes, and verifies global news sources to produce decision-ready
                  intelligence reports.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Automated Collection:</strong> Global, regional, and industry-specific news aggregation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>AI Analysis:</strong> Summarization, issue clustering, entity tagging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Expert Verification:</strong> Cross-validation and counter-argument integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Weekly Reports:</strong> Intelligence briefs with full evidence trails</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Deliverables</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <FileText size={16} /> Weekly Intelligence Report
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 size={16} /> Trend Analysis Dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck size={16} /> Source Verification Logs
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service 2: AI Auditor / AAA */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                <Shield className="text-accent-teal" size={24} />
              </div>
              <h3 className="text-2xl font-bold">AI Auditor / AAA</h3>
              <span className="px-2 py-1 bg-accent-teal/10 text-accent-teal text-xs rounded">Semi-Automated Analysis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6">
                  For organizations facing critical policy, investment, or adoption decisions
                  that require rigorous judgment verification. Our semi-automated audit process
                  combines AI analysis with human expert review.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Input Processing:</strong> Document and data ingestion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>AI First-Pass:</strong> Automated analysis and risk identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Human Review:</strong> Expert validation and supplementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Final Delivery:</strong> Certified audit package</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Output Package</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="text-amber-500 mt-0.5" size={16} />
                    <div>
                      <strong>Risk Label Map</strong>
                      <p className="text-gray-600">Risk items, severity levels, conditions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck className="text-accent-teal mt-0.5" size={16} />
                    <div>
                      <strong>Evidence & Provenance Log</strong>
                      <p className="text-gray-600">Sources, versions, limitations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="text-primary mt-0.5" size={16} />
                    <div>
                      <strong>Decision Memo</strong>
                      <p className="text-gray-600">Actionable recommendation format</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="text-accent-green mt-0.5" size={16} />
                    <div>
                      <strong>Counter-arguments</strong>
                      <p className="text-gray-600">Failure modes and alternative scenarios</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service 3: Truth Verification */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center">
                <FileCheck className="text-accent-green" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Truth Verification & Certified Dataset</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6">
                  Build verified knowledge bases through expert-validated judgment processes.
                  Our certified datasets serve as the foundation for trustworthy AI governance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>AI Content Review:</strong> Hallucination and bias detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Source Verification:</strong> Full data provenance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Expert Certification:</strong> Specialist validation stamps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-accent-teal mt-1 flex-shrink-0" size={18} />
                    <span><strong>Dataset Export:</strong> Certified data for downstream use</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Use Cases</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Strategic document error correction</li>
                  <li>• AI-generated content verification</li>
                  <li>• Policy brief validation</li>
                  <li>• Research paper fact-checking</li>
                  <li>• Corporate report auditing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Model */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Engagement Models</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Pilot Program</h3>
              <p className="text-gray-600 mb-4">
                Initial engagement to demonstrate value and establish baseline metrics.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Scoped proof-of-concept</li>
                <li>• Success criteria definition</li>
                <li>• Reference case development</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-accent-teal">
              <span className="text-accent-teal text-xs font-semibold">RECOMMENDED</span>
              <h3 className="text-xl font-bold mb-2">Monthly Subscription</h3>
              <p className="text-gray-600 mb-4">
                Ongoing intelligence and verification services with predictable costs.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Weekly intelligence reports</li>
                <li>• On-demand audit requests</li>
                <li>• Priority support</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">
                Custom solutions for large organizations with specific requirements.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dedicated team</li>
                <li>• Custom integrations</li>
                <li>• SLA guarantees</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Let&apos;s discuss how AIDX services can help your organization make
            verified, accountable AI-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@trutha.ai"
              className="inline-flex items-center justify-center gap-2 bg-accent-teal hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Mail size={20} />
              Contact Us
            </a>
            <Link
              href="/aidx-odn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Explore ODN Platform <ArrowRight size={20} />
            </Link>
          </div>
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
