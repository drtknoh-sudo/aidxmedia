import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export type PostCategory = "news" | "research" | "commentary";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole?: string;
  category: PostCategory;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostSlugs(category: PostCategory): string[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  return fs.readdirSync(categoryPath).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string, category: PostCategory): Post | null {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(contentDirectory, category, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    author: data.author || "Anonymous",
    authorRole: data.authorRole,
    category: category,
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    content,
  };
}

export function getAllPosts(category?: PostCategory): Post[] {
  const categories: PostCategory[] = category
    ? [category]
    : ["news", "research", "commentary"];

  const posts: Post[] = [];

  for (const cat of categories) {
    const slugs = getPostSlugs(cat);
    for (const slug of slugs) {
      const post = getPostBySlug(slug, cat);
      if (post) {
        posts.push(post);
      }
    }
  }

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getLatestPosts(limit: number = 5): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}
