// Vote Use Cases - Clean Architecture

import type { CastVoteInput, VoteResult } from "../entities/types";
import type {
  IVoteRepository,
  IPostRepository,
  ICommentRepository,
} from "../ports/repositories";

export class CastPostVoteUseCase {
  constructor(
    private voteRepository: IVoteRepository,
    private postRepository: IPostRepository
  ) {}

  async execute(input: CastVoteInput): Promise<VoteResult> {
    const { userId, postId, value } = input;

    if (!postId) {
      throw new Error("postId is required for post vote");
    }

    if (value !== 1 && value !== -1) {
      throw new Error("Vote value must be 1 or -1");
    }

    // Check existing vote
    const existingVote = await this.voteRepository.findByUserAndPost(
      userId,
      postId
    );

    let previousValue = 0;
    let newValue = value;

    if (existingVote) {
      previousValue = existingVote.value;

      // If same vote, remove it (toggle off)
      if (existingVote.value === value) {
        await this.voteRepository.delete(existingVote.id);
        newValue = 0;
      } else {
        // Update to new vote
        await this.voteRepository.upsert({ userId, postId, value });
      }
    } else {
      // Create new vote
      await this.voteRepository.upsert({ userId, postId, value });
    }

    // Update post score
    await this.postRepository.updateScore(postId);
    await this.postRepository.updateHotScore(postId);

    // Get updated post to return new score
    const post = await this.postRepository.findById(postId);

    return {
      success: true,
      previousValue,
      newValue,
      newScore: post?.score ?? 0,
    };
  }
}

export class CastCommentVoteUseCase {
  constructor(
    private voteRepository: IVoteRepository,
    private commentRepository: ICommentRepository
  ) {}

  async execute(input: CastVoteInput): Promise<VoteResult> {
    const { userId, commentId, value } = input;

    if (!commentId) {
      throw new Error("commentId is required for comment vote");
    }

    if (value !== 1 && value !== -1) {
      throw new Error("Vote value must be 1 or -1");
    }

    // Check existing vote
    const existingVote = await this.voteRepository.findByUserAndComment(
      userId,
      commentId
    );

    let previousValue = 0;
    let newValue = value;

    if (existingVote) {
      previousValue = existingVote.value;

      // If same vote, remove it (toggle off)
      if (existingVote.value === value) {
        await this.voteRepository.delete(existingVote.id);
        newValue = 0;
      } else {
        // Update to new vote
        await this.voteRepository.upsert({ userId, commentId, value });
      }
    } else {
      // Create new vote
      await this.voteRepository.upsert({ userId, commentId, value });
    }

    // Update comment score
    await this.commentRepository.updateScore(commentId);

    // Get updated comment to return new score
    const comment = await this.commentRepository.findById(commentId);

    return {
      success: true,
      previousValue,
      newValue,
      newScore: comment?.score ?? 0,
    };
  }
}

export class GetUserVotesForPostsUseCase {
  constructor(private voteRepository: IVoteRepository) {}

  async execute(
    userId: string,
    postIds: string[]
  ): Promise<Record<string, number>> {
    const votes = await this.voteRepository.findUserVotesForPosts(
      userId,
      postIds
    );

    const voteMap: Record<string, number> = {};
    for (const vote of votes) {
      if (vote.postId) {
        voteMap[vote.postId] = vote.value;
      }
    }

    return voteMap;
  }
}

export class GetUserVotesForCommentsUseCase {
  constructor(private voteRepository: IVoteRepository) {}

  async execute(
    userId: string,
    commentIds: string[]
  ): Promise<Record<string, number>> {
    const votes = await this.voteRepository.findUserVotesForComments(
      userId,
      commentIds
    );

    const voteMap: Record<string, number> = {};
    for (const vote of votes) {
      if (vote.commentId) {
        voteMap[vote.commentId] = vote.value;
      }
    }

    return voteMap;
  }
}
