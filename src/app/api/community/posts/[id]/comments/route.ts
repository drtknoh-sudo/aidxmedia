import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infrastructure/web/auth/auth";
import { createRepositories } from "@/adapters/gateways/prisma-repositories";
import {
  CreateCommentUseCase,
  GetCommentsUseCase,
} from "@/core/use-cases/CommentUseCases";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(10000),
  parentId: z.string().optional(),
});

const querySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/community/posts/[id]/comments - Get comments for post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: postId } = await params;
    const { searchParams } = new URL(request.url);

    const query = querySchema.parse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    const { commentRepository, voteRepository } = createRepositories();
    const getCommentsUseCase = new GetCommentsUseCase(commentRepository);

    const comments = await getCommentsUseCase.execute({
      postId,
      page: query.page,
      limit: query.limit,
    });

    // Get user votes if authenticated
    const session = await getServerSession(authOptions);
    let userVotes: Record<string, number> = {};

    if (session?.user?.id) {
      // Flatten all comment IDs including nested ones
      const getAllCommentIds = (comments: any[]): string[] => {
        return comments.flatMap((c) => [
          c.id,
          ...(c.replies ? getAllCommentIds(c.replies) : []),
        ]);
      };

      const commentIds = getAllCommentIds(comments);
      const votes = await voteRepository.findUserVotesForComments(
        session.user.id,
        commentIds
      );
      userVotes = votes.reduce(
        (acc, v) => {
          if (v.commentId) acc[v.commentId] = v.value;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    return NextResponse.json({ comments, userVotes });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/community/posts/[id]/comments - Create comment
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const body = await request.json();
    const validatedData = createCommentSchema.parse(body);

    const { commentRepository, postRepository } = createRepositories();
    const createCommentUseCase = new CreateCommentUseCase(
      commentRepository,
      postRepository
    );

    const comment = await createCommentUseCase.execute({
      ...validatedData,
      postId,
      authorId: session.user.id,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (
        error.message === "Post not found" ||
        error.message === "Parent comment not found"
      ) {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
    }
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
