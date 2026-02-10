// Comment Use Cases - Clean Architecture

import type {
  Comment,
  CreateCommentInput,
  GetCommentsInput,
} from "../entities/types";
import type { ICommentRepository, IPostRepository } from "../ports/repositories";

const MAX_COMMENT_DEPTH = 6;

export class CreateCommentUseCase {
  constructor(
    private commentRepository: ICommentRepository,
    private postRepository: IPostRepository
  ) {}

  async execute(input: CreateCommentInput): Promise<Comment> {
    // Verify post exists
    const post = await this.postRepository.findById(input.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    // If replying to a comment, check parent exists and get depth
    let depth = 0;
    if (input.parentId) {
      const parent = await this.commentRepository.findById(input.parentId);
      if (!parent) {
        throw new Error("Parent comment not found");
      }
      if (parent.postId !== input.postId) {
        throw new Error("Parent comment belongs to different post");
      }
      depth = parent.depth + 1;
      if (depth > MAX_COMMENT_DEPTH) {
        throw new Error(`Maximum comment depth of ${MAX_COMMENT_DEPTH} exceeded`);
      }
    }

    return this.commentRepository.create({
      ...input,
      content: input.content.trim(),
    });
  }
}

export class GetCommentsUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(input: GetCommentsInput): Promise<Comment[]> {
    return this.commentRepository.findByPost(input);
  }
}

export class GetCommentByIdUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(id: string): Promise<Comment | null> {
    return this.commentRepository.findById(id);
  }
}

export class UpdateCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(
    id: string,
    content: string,
    userId: string,
    isAdmin: boolean
  ): Promise<Comment> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Check authorization
    if (comment.authorId !== userId && !isAdmin) {
      throw new Error("Unauthorized to update this comment");
    }

    return this.commentRepository.update(id, content.trim());
  }
}

export class DeleteCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(id: string, userId: string, isAdmin: boolean): Promise<void> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Check authorization
    if (comment.authorId !== userId && !isAdmin) {
      throw new Error("Unauthorized to delete this comment");
    }

    await this.commentRepository.delete(id);
  }
}

export class GetCommentCountUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(postId: string): Promise<number> {
    return this.commentRepository.countByPost(postId);
  }
}
