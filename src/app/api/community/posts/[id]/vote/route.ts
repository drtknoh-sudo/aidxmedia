import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infrastructure/web/auth/auth";
import { createRepositories } from "@/adapters/gateways/prisma-repositories";
import { CastPostVoteUseCase } from "@/core/use-cases/VoteUseCases";
import { z } from "zod";

const voteSchema = z.object({
  value: z.union([z.literal(1), z.literal(-1)]),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/community/posts/[id]/vote - Vote on post
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const body = await request.json();
    const { value } = voteSchema.parse(body);

    const { voteRepository, postRepository } = createRepositories();
    const castVoteUseCase = new CastPostVoteUseCase(
      voteRepository,
      postRepository
    );

    const result = await castVoteUseCase.execute({
      userId: session.user.id,
      postId,
      value,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error voting on post:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
