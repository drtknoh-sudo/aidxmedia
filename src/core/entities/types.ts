// Domain Entity Types for AIDX ODN Community

export type Role = "USER" | "ADMIN";

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "DELETED";

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: Role;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  isAdminPost: boolean;
  isPinned: boolean;
  upvotes: number;
  downvotes: number;
  score: number;
  hotScore: number;
  status: PostStatus;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    comments: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  parentId: string | null;
  depth: number;
  upvotes: number;
  downvotes: number;
  score: number;
  postId: string;
  authorId: string;
  author?: User;
  replies?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  value: number; // +1 for upvote, -1 for downvote
  postId: string | null;
  commentId: string | null;
  userId: string;
  createdAt: Date;
}

export interface Share {
  id: string;
  postId: string;
  platform: string;
  createdAt: Date;
}

// Input Types for Use Cases

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
  isAdminPost?: boolean;
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  isPinned?: boolean;
  status?: PostStatus;
}

export interface CreateCommentInput {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
}

export interface CastVoteInput {
  userId: string;
  postId?: string;
  commentId?: string;
  value: number; // +1 or -1
}

export interface GetPostsInput {
  sort?: "hot" | "new" | "top";
  page?: number;
  limit?: number;
  adminOnly?: boolean;
}

export interface GetCommentsInput {
  postId: string;
  page?: number;
  limit?: number;
}

// Output Types

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}

export interface VoteResult {
  success: boolean;
  previousValue: number;
  newValue: number;
  newScore: number;
}
