import { Metadata } from "next";
import { CommunityFeed } from "./CommunityFeed";

export const metadata: Metadata = {
  title: "AI Dystopia Stories | AIDX ODN Community",
  description:
    "Share and discuss potential AI dystopia scenarios. Join our community to explore, debate, and learn from imagined futures where AI impacts society.",
};

export const dynamic = "force-dynamic";

export default function AidxOdnPage() {
  return <CommunityFeed />;
}
