// Repository Interfaces (Ports) - Clean Architecture

import type {
  Post,
  Comment,
  Vote,
  User,
  CreatePostInput,
  UpdatePostInput,
  CreateCommentInput,
  CastVoteInput,
  GetPostsInput,
  GetCommentsInput,
  PaginatedPosts,
} from "../entities/types";

export interface IPostRepository {
  // CRUD
  create(input: CreatePostInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findBySlug(slug: string): Promise<Post | null>;
  update(input: UpdatePostInput): Promise<Post>;
  delete(id: string): Promise<void>;

  // Queries
  findMany(input: GetPostsInput): Promise<PaginatedPosts>;
  findPinnedPosts(): Promise<Post[]>;
  findByAuthor(authorId: string, limit?: number): Promise<Post[]>;

  // Score updates
  updateScore(postId: string): Promise<void>;
  updateHotScore(postId: string): Promise<void>;
}

export interface ICommentRepository {
  // CRUD
  create(input: CreateCommentInput): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  update(id: string, content: string): Promise<Comment>;
  delete(id: string): Promise<void>;

  // Queries
  findByPost(input: GetCommentsInput): Promise<Comment[]>;
  findReplies(parentId: string): Promise<Comment[]>;
  countByPost(postId: string): Promise<number>;

  // Score updates
  updateScore(commentId: string): Promise<void>;
}

export interface IVoteRepository {
  // CRUD
  upsert(input: CastVoteInput): Promise<Vote>;
  delete(id: string): Promise<void>;

  // Queries
  findByUserAndPost(userId: string, postId: string): Promise<Vote | null>;
  findByUserAndComment(userId: string, commentId: string): Promise<Vote | null>;
  findUserVotesForPosts(userId: string, postIds: string[]): Promise<Vote[]>;
  findUserVotesForComments(
    userId: string,
    commentIds: string[]
  ): Promise<Vote[]>;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateRole(id: string, role: "USER" | "ADMIN"): Promise<User>;
}

export interface IShareRepository {
  create(postId: string, platform: string): Promise<void>;
  countByPost(postId: string): Promise<number>;
}
