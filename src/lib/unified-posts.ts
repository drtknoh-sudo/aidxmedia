/**
 * Unified Posts System
 *
 * This module combines posts from both MDX files and Notion database.
 * It provides a single interface for fetching posts regardless of their source.
 *
 * Priority: Notion posts override MDX posts with the same slug.
 */

import { getAllPosts, getPostBySlug, getFeaturedPosts, getLatestPosts, getPostsByTag } from "./posts";
import {
  getAllNotionPosts,
  getNotionPosts,
  getNotionPostBySlug,
  getNotionFeaturedPosts,
  isNotionConfigured
} from "./notion";
import type { Post, PostMeta, PostCategory } from "./posts";

/**
 * Get all posts from both MDX and Notion
 * Notion posts take priority for duplicate slugs
 */
export async function getUnifiedPosts(category?: PostCategory): Promise<Post[]> {
  // Get MDX posts
  const mdxPosts = getAllPosts(category);

  // If Notion is not configured, return only MDX posts
  if (!isNotionConfigured()) {
    return mdxPosts;
  }

  // Get Notion posts
  let notionPosts: PostMeta[];
  if (category) {
    notionPosts = await getNotionPosts(category);
  } else {
    notionPosts = await getAllNotionPosts();
  }

  // Create a map of MDX posts by slug+category for easy lookup
  const mdxPostMap = new Map<string, Post>();
  for (const post of mdxPosts) {
    mdxPostMap.set(`${post.category}/${post.slug}`, post);
  }

  // Merge posts: Notion posts override MDX posts with same slug
  const mergedPosts: Post[] = [];
  const processedSlugs = new Set<string>();

  // Add Notion posts first (higher priority)
  for (const notionPost of notionPosts) {
    const key = `${notionPost.category}/${notionPost.slug}`;
    processedSlugs.add(key);

    // Notion posts come as PostMeta, we need to convert them to Post
    // For listing purposes, we can use empty content; full content fetched separately
    mergedPosts.push({
      ...notionPost,
      content: "", // Content will be fetched when viewing individual post
    });
  }

  // Add MDX posts that don't have Notion counterparts
  for (const mdxPost of mdxPosts) {
    const key = `${mdxPost.category}/${mdxPost.slug}`;
    if (!processedSlugs.has(key)) {
      mergedPosts.push(mdxPost);
    }
  }

  // Sort by date, newest first
  return mergedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single post by slug
 * Checks Notion first, then falls back to MDX
 */
export async function getUnifiedPostBySlug(
  slug: string,
  category: PostCategory
): Promise<Post | null> {
  // If Notion is configured, try Notion first
  if (isNotionConfigured()) {
    const notionPost = await getNotionPostBySlug(slug, category);
    if (notionPost) {
      return notionPost;
    }
  }

  // Fall back to MDX
  return getPostBySlug(slug, category);
}

/**
 * Get featured posts from both sources
 */
export async function getUnifiedFeaturedPosts(): Promise<Post[]> {
  // Get MDX featured posts
  const mdxFeatured = getFeaturedPosts();

  // If Notion is not configured, return only MDX featured
  if (!isNotionConfigured()) {
    return mdxFeatured;
  }

  // Get Notion featured posts
  const notionFeatured = await getNotionFeaturedPosts();

  // Merge and deduplicate
  const processedSlugs = new Set<string>();
  const merged: Post[] = [];

  // Notion posts first
  for (const post of notionFeatured) {
    const key = `${post.category}/${post.slug}`;
    if (!processedSlugs.has(key)) {
      processedSlugs.add(key);
      merged.push({
        ...post,
        content: "",
      });
    }
  }

  // MDX posts that aren't in Notion
  for (const post of mdxFeatured) {
    const key = `${post.category}/${post.slug}`;
    if (!processedSlugs.has(key)) {
      merged.push(post);
    }
  }

  // Sort by date
  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get latest posts from both sources
 */
export async function getUnifiedLatestPosts(limit: number = 5): Promise<Post[]> {
  const allPosts = await getUnifiedPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get posts by tag from both sources
 */
export async function getUnifiedPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getUnifiedPosts();
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get post metadata only (faster, no content fetching)
 */
export async function getUnifiedPostsMeta(category?: PostCategory): Promise<PostMeta[]> {
  const posts = await getUnifiedPosts(category);
  return posts.map(({ content, ...meta }) => meta);
}
