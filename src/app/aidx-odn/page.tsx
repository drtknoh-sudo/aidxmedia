import { Metadata } from "next";
import { CommunityFeed } from "./CommunityFeed";

export const metadata: Metadata = {
  title: "AIDX ODN | Open Design Network for AI Futures",
  description:
    "Join the AIDX Modeling Open Design Network — a community for debating AI-driven futures, proposing designs for social transitions, and building verified knowledge through open discussion.",
};

export const dynamic = "force-dynamic";

export default function AidxOdnPage() {
  return <CommunityFeed />;
}
