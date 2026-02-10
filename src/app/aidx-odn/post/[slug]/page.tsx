import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createRepositories } from "@/adapters/gateways/prisma-repositories";
import { PostDetailClient } from "./PostDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { postRepository } = createRepositories();
  const post = await postRepository.findBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | AI Dystopia Stories`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: "article",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { postRepository } = createRepositories();
  const post = await postRepository.findBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetailClient initialPost={post} />;
}
