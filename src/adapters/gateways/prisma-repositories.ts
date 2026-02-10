// Prisma Repository Implementations - Adapters Layer

import { prisma } from "@/infrastructure/db/prisma";
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
} from "@/core/entities/types";
import type {
  IPostRepository,
  ICommentRepository,
  IVoteRepository,
  IUserRepository,
  IShareRepository,
} from "@/core/ports/repositories";
import { calculateHotScore } from "@/core/use-cases/PostUseCases";

// Helper to generate slug
function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 100) +
    "-" +
    Date.now().toString(36)
  );
}

// ============ Post Repository ============

export class PrismaPostRepository implements IPostRepository {
  async create(input: CreatePostInput): Promise<Post> {
    const slug = generateSlug(input.title);
    const post = await prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        slug,
        authorId: input.authorId,
        isAdminPost: input.isAdminPost ?? false,
      },
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    return this.mapToEntity(post);
  }

  async findById(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    return post ? this.mapToEntity(post) : null;
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    return post ? this.mapToEntity(post) : null;
  }

  async update(input: UpdatePostInput): Promise<Post> {
    const post = await prisma.post.update({
      where: { id: input.id },
      data: {
        ...(input.title && { title: input.title }),
        ...(input.content && { content: input.content }),
        ...(input.isPinned !== undefined && { isPinned: input.isPinned }),
        ...(input.status && { status: input.status }),
      },
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    return this.mapToEntity(post);
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } });
  }

  async findMany(input: GetPostsInput): Promise<PaginatedPosts> {
    const { sort = "hot", page = 1, limit = 20, adminOnly = false } = input;

    const where = {
      status: "PUBLISHED" as const,
      ...(adminOnly && { isAdminPost: true }),
    };

    const orderBy = this.getOrderBy(sort);

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: true,
          _count: {
            select: { comments: true },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      posts: posts.map((p: any) => this.mapToEntity(p)),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findPinnedPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        isPinned: true,
        status: "PUBLISHED",
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((p: any) => this.mapToEntity(p));
  }

  async findByAuthor(authorId: string, limit = 10): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: { authorId, status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((p: any) => this.mapToEntity(p));
  }

  async updateScore(postId: string): Promise<void> {
    const votes = await prisma.vote.aggregate({
      where: { postId },
      _sum: { value: true },
    });

    const upvotes = await prisma.vote.count({
      where: { postId, value: 1 },
    });

    const downvotes = await prisma.vote.count({
      where: { postId, value: -1 },
    });

    await prisma.post.update({
      where: { id: postId },
      data: {
        upvotes,
        downvotes,
        score: votes._sum.value ?? 0,
      },
    });
  }

  async updateHotScore(postId: string): Promise<void> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { upvotes: true, downvotes: true, createdAt: true },
    });

    if (post) {
      const hotScore = calculateHotScore(
        post.upvotes,
        post.downvotes,
        post.createdAt
      );

      await prisma.post.update({
        where: { id: postId },
        data: { hotScore },
      });
    }
  }

  private getOrderBy(sort: string) {
    switch (sort) {
      case "new":
        return { createdAt: "desc" as const };
      case "top":
        return { score: "desc" as const };
      case "hot":
      default:
        return { hotScore: "desc" as const };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(post: any): Post {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      isAdminPost: post.isAdminPost,
      isPinned: post.isPinned,
      upvotes: post.upvotes,
      downvotes: post.downvotes,
      score: post.score,
      hotScore: post.hotScore,
      status: post.status,
      authorId: post.authorId,
      author: post.author
        ? {
            id: post.author.id,
            email: post.author.email,
            name: post.author.name,
            image: post.author.image,
            role: post.author.role,
            createdAt: post.author.createdAt,
          }
        : undefined,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      _count: post._count,
    };
  }
}

// ============ Comment Repository ============

export class PrismaCommentRepository implements ICommentRepository {
  async create(input: CreateCommentInput): Promise<Comment> {
    let depth = 0;
    if (input.parentId) {
      const parent = await prisma.comment.findUnique({
        where: { id: input.parentId },
        select: { depth: true },
      });
      depth = (parent?.depth ?? 0) + 1;
    }

    const comment = await prisma.comment.create({
      data: {
        content: input.content,
        postId: input.postId,
        authorId: input.authorId,
        parentId: input.parentId ?? null,
        depth,
      },
      include: {
        author: true,
      },
    });

    return this.mapToEntity(comment);
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
        replies: {
          include: { author: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return comment ? this.mapToEntity(comment) : null;
  }

  async update(id: string, content: string): Promise<Comment> {
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
      include: { author: true },
    });

    return this.mapToEntity(comment);
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.delete({ where: { id } });
  }

  async findByPost(input: GetCommentsInput): Promise<Comment[]> {
    const { postId, page = 1, limit = 50 } = input;

    // Get top-level comments first
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: true,
        replies: {
          include: {
            author: true,
            replies: {
              include: {
                author: true,
                replies: {
                  include: {
                    author: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return comments.map((c: any) => this.mapToEntityWithReplies(c));
  }

  async findReplies(parentId: string): Promise<Comment[]> {
    const replies = await prisma.comment.findMany({
      where: { parentId },
      orderBy: { createdAt: "asc" },
      include: { author: true },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return replies.map((c: any) => this.mapToEntity(c));
  }

  async countByPost(postId: string): Promise<number> {
    return prisma.comment.count({ where: { postId } });
  }

  async updateScore(commentId: string): Promise<void> {
    const votes = await prisma.vote.aggregate({
      where: { commentId },
      _sum: { value: true },
    });

    const upvotes = await prisma.vote.count({
      where: { commentId, value: 1 },
    });

    const downvotes = await prisma.vote.count({
      where: { commentId, value: -1 },
    });

    await prisma.comment.update({
      where: { id: commentId },
      data: {
        upvotes,
        downvotes,
        score: votes._sum.value ?? 0,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(comment: any): Comment {
    return {
      id: comment.id,
      content: comment.content,
      parentId: comment.parentId,
      depth: comment.depth,
      upvotes: comment.upvotes,
      downvotes: comment.downvotes,
      score: comment.score,
      postId: comment.postId,
      authorId: comment.authorId,
      author: comment.author
        ? {
            id: comment.author.id,
            email: comment.author.email,
            name: comment.author.name,
            image: comment.author.image,
            role: comment.author.role,
            createdAt: comment.author.createdAt,
          }
        : undefined,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntityWithReplies(comment: any): Comment {
    return {
      ...this.mapToEntity(comment),
      replies: comment.replies?.map((r: any) => this.mapToEntityWithReplies(r)),
    };
  }
}

// ============ Vote Repository ============

export class PrismaVoteRepository implements IVoteRepository {
  async upsert(input: CastVoteInput): Promise<Vote> {
    const { userId, postId, commentId, value } = input;

    if (postId) {
      const vote = await prisma.vote.upsert({
        where: {
          userId_postId: { userId, postId },
        },
        create: { userId, postId, value },
        update: { value },
      });
      return this.mapToEntity(vote);
    }

    if (commentId) {
      const vote = await prisma.vote.upsert({
        where: {
          userId_commentId: { userId, commentId },
        },
        create: { userId, commentId, value },
        update: { value },
      });
      return this.mapToEntity(vote);
    }

    throw new Error("Either postId or commentId is required");
  }

  async delete(id: string): Promise<void> {
    await prisma.vote.delete({ where: { id } });
  }

  async findByUserAndPost(userId: string, postId: string): Promise<Vote | null> {
    const vote = await prisma.vote.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    return vote ? this.mapToEntity(vote) : null;
  }

  async findByUserAndComment(
    userId: string,
    commentId: string
  ): Promise<Vote | null> {
    const vote = await prisma.vote.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      },
    });

    return vote ? this.mapToEntity(vote) : null;
  }

  async findUserVotesForPosts(userId: string, postIds: string[]): Promise<Vote[]> {
    const votes = await prisma.vote.findMany({
      where: {
        userId,
        postId: { in: postIds },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return votes.map((v: any) => this.mapToEntity(v));
  }

  async findUserVotesForComments(
    userId: string,
    commentIds: string[]
  ): Promise<Vote[]> {
    const votes = await prisma.vote.findMany({
      where: {
        userId,
        commentId: { in: commentIds },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return votes.map((v: any) => this.mapToEntity(v));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(vote: any): Vote {
    return {
      id: vote.id,
      value: vote.value,
      postId: vote.postId,
      commentId: vote.commentId,
      userId: vote.userId,
      createdAt: vote.createdAt,
    };
  }
}

// ============ User Repository ============

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user ? this.mapToEntity(user) : null;
  }

  async updateRole(id: string, role: "USER" | "ADMIN"): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });
    return this.mapToEntity(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(user: any): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}

// ============ Share Repository ============

export class PrismaShareRepository implements IShareRepository {
  async create(postId: string, platform: string): Promise<void> {
    await prisma.share.create({
      data: { postId, platform },
    });
  }

  async countByPost(postId: string): Promise<number> {
    return prisma.share.count({ where: { postId } });
  }
}

// ============ Repository Factory ============

export function createRepositories() {
  return {
    postRepository: new PrismaPostRepository(),
    commentRepository: new PrismaCommentRepository(),
    voteRepository: new PrismaVoteRepository(),
    userRepository: new PrismaUserRepository(),
    shareRepository: new PrismaShareRepository(),
  };
}
