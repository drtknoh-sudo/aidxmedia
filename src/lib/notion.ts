import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { PostMeta, Post, PostCategory } from "./posts";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize NotionToMarkdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

// Database IDs for each category (set in environment variables)
const DATABASE_IDS: Record<PostCategory, string | undefined> = {
  news: process.env.NOTION_NEWS_DB_ID,
  research: process.env.NOTION_RESEARCH_DB_ID,
  commentary: process.env.NOTION_COMMENTARY_DB_ID,
};

// Type definitions for Notion properties
interface NotionTitleProperty {
  type: "title";
  title: Array<{ plain_text: string }>;
}

interface NotionRichTextProperty {
  type: "rich_text";
  rich_text: Array<{ plain_text: string }>;
}

interface NotionDateProperty {
  type: "date";
  date: { start: string } | null;
}

interface NotionCheckboxProperty {
  type: "checkbox";
  checkbox: boolean;
}

interface NotionMultiSelectProperty {
  type: "multi_select";
  multi_select: Array<{ name: string }>;
}

interface NotionSelectProperty {
  type: "select";
  select: { name: string } | null;
}

interface NotionUrlProperty {
  type: "url";
  url: string | null;
}

interface NotionFilesProperty {
  type: "files";
  files: Array<{
    type: "file" | "external";
    file?: { url: string };
    external?: { url: string };
  }>;
}

type NotionProperty =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionDateProperty
  | NotionCheckboxProperty
  | NotionMultiSelectProperty
  | NotionSelectProperty
  | NotionUrlProperty
  | NotionFilesProperty;

interface NotionPageProperties {
  [key: string]: NotionProperty;
}

interface NotionPage {
  id: string;
  properties: NotionPageProperties;
  cover?: {
    type: "file" | "external";
    file?: { url: string };
    external?: { url: string };
  } | null;
}

/**
 * Extract property value from Notion page
 */
function getPropertyValue(
  properties: NotionPageProperties,
  key: string
): string | boolean | string[] | null {
  const prop = properties[key];
  if (!prop) return null;

  switch (prop.type) {
    case "title":
      return prop.title.map((t) => t.plain_text).join("");
    case "rich_text":
      return prop.rich_text.map((t) => t.plain_text).join("");
    case "date":
      return prop.date?.start || null;
    case "checkbox":
      return prop.checkbox;
    case "multi_select":
      return prop.multi_select.map((s) => s.name);
    case "select":
      return prop.select?.name || null;
    case "url":
      return prop.url;
    case "files":
      if (prop.files.length > 0) {
        const file = prop.files[0];
        return file.type === "file" ? file.file?.url || null : file.external?.url || null;
      }
      return null;
    default:
      return null;
  }
}

/**
 * Get cover image URL from Notion page
 */
function getCoverImage(page: NotionPage): string | undefined {
  if (!page.cover) return undefined;

  if (page.cover.type === "file" && page.cover.file) {
    return page.cover.file.url;
  }
  if (page.cover.type === "external" && page.cover.external) {
    return page.cover.external.url;
  }
  return undefined;
}

/**
 * Convert Notion page to PostMeta
 */
function notionPageToPostMeta(page: NotionPage, category: PostCategory): PostMeta {
  const props = page.properties;

  // Generate slug from title or page ID
  const title = getPropertyValue(props, "Title") as string ||
                getPropertyValue(props, "Name") as string ||
                "Untitled";
  const slug = (getPropertyValue(props, "Slug") as string) ||
               title.toLowerCase()
                 .replace(/[^a-z0-9]+/g, "-")
                 .replace(/^-|-$/g, "") ||
               page.id;

  // Get image from cover or Image property
  const imageFromProperty = getPropertyValue(props, "Image") as string | null;
  const image = imageFromProperty || getCoverImage(page);

  return {
    slug,
    title,
    description: (getPropertyValue(props, "Description") as string) || "",
    date: (getPropertyValue(props, "Date") as string) || new Date().toISOString().split("T")[0],
    author: (getPropertyValue(props, "Author") as string) || "Trutha ai",
    authorRole: (getPropertyValue(props, "AuthorRole") as string) || undefined,
    category,
    tags: (getPropertyValue(props, "Tags") as string[]) || [],
    image,
    featured: (getPropertyValue(props, "Featured") as boolean) || false,
  };
}

/**
 * Query Notion database
 */
async function queryDatabase(params: Parameters<typeof notion.databases.query>[0]) {
  return notion.databases.query(params);
}

/**
 * Get all posts from Notion database for a category
 */
export async function getNotionPosts(category: PostCategory): Promise<PostMeta[]> {
  const databaseId = DATABASE_IDS[category];

  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.log(`Notion not configured for category: ${category}`);
    return [];
  }

  try {
    const response = await queryDatabase({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) =>
      notionPageToPostMeta(page as unknown as NotionPage, category)
    );
  } catch (error) {
    console.error(`Error fetching Notion posts for ${category}:`, error);
    return [];
  }
}

/**
 * Get all posts from all Notion databases
 */
export async function getAllNotionPosts(): Promise<PostMeta[]> {
  const categories: PostCategory[] = ["news", "research", "commentary"];
  const allPosts: PostMeta[] = [];

  for (const category of categories) {
    const posts = await getNotionPosts(category);
    allPosts.push(...posts);
  }

  // Sort by date, newest first
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single post with full content from Notion
 */
export async function getNotionPostBySlug(
  slug: string,
  category: PostCategory
): Promise<Post | null> {
  const databaseId = DATABASE_IDS[category];

  if (!databaseId || !process.env.NOTION_API_KEY) {
    return null;
  }

  try {
    // Search for the page by slug
    const response = await queryDatabase({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Title",
            title: {
              equals: slug.replace(/-/g, " "),
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0] as unknown as NotionPage;
    const meta = notionPageToPostMeta(page, category);

    // Convert page content to markdown
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const content = n2m.toMarkdownString(mdblocks).parent;

    return {
      ...meta,
      content,
    };
  } catch (error) {
    console.error(`Error fetching Notion post ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured posts from Notion
 */
export async function getNotionFeaturedPosts(): Promise<PostMeta[]> {
  const allPosts = await getAllNotionPosts();
  return allPosts.filter((post) => post.featured);
}

/**
 * Check if Notion is configured
 */
export function isNotionConfigured(): boolean {
  return !!(
    process.env.NOTION_API_KEY &&
    (process.env.NOTION_NEWS_DB_ID ||
      process.env.NOTION_RESEARCH_DB_ID ||
      process.env.NOTION_COMMENTARY_DB_ID)
  );
}
