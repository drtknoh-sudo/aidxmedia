// Post Use Cases - Clean Architecture

import type {
  Post,
  CreatePostInput,
  UpdatePostInput,
  GetPostsInput,
  PaginatedPosts,
} from "../entities/types";
import type { IPostRepository } from "../ports/repositories";

// Helper to generate slug from title
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

// Calculate hot score using Reddit's algorithm
function calculateHotScore(upvotes: number, downvotes: number, createdAt: Date): number {
  const score = upvotes - downvotes;
  const order = Math.log10(Math.max(Math.abs(score), 1));
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
  const seconds = (createdAt.getTime() - new Date("2024-01-01").getTime()) / 1000;
  return sign * order + seconds / 45000;
}

export class CreatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: CreatePostInput): Promise<Post> {
    const slug = generateSlug(input.title);

    const post = await this.postRepository.create({
      ...input,
      title: input.title.trim(),
      content: input.content.trim(),
    });

    return post;
  }
}

export class GetPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: GetPostsInput = {}): Promise<PaginatedPosts> {
    const { sort = "hot", page = 1, limit = 20, adminOnly = false } = input;

    return this.postRepository.findMany({
      sort,
      page,
      limit,
      adminOnly,
    });
  }
}

export class GetPostByIdUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }
}

export class GetPostBySlugUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(slug: string): Promise<Post | null> {
    return this.postRepository.findBySlug(slug);
  }
}

export class UpdatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(
    input: UpdatePostInput,
    userId: string,
    isAdmin: boolean
  ): Promise<Post> {
    const post = await this.postRepository.findById(input.id);

    if (!post) {
      throw new Error("Post not found");
    }

    // Check authorization
    if (post.authorId !== userId && !isAdmin) {
      throw new Error("Unauthorized to update this post");
    }

    return this.postRepository.update(input);
  }
}

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string, userId: string, isAdmin: boolean): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    // Check authorization
    if (post.authorId !== userId && !isAdmin) {
      throw new Error("Unauthorized to delete this post");
    }

    await this.postRepository.delete(id);
  }
}

export class GetPinnedPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findPinnedPosts();
  }
}

export class TogglePinPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string, isPinned: boolean): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    return this.postRepository.update({ id, isPinned });
  }
}

export { generateSlug, calculateHotScore };
