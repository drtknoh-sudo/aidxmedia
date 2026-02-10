import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infrastructure/web/auth/auth";
import { createRepositories } from "@/adapters/gateways/prisma-repositories";
import {
  GetPostByIdUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
} from "@/core/use-cases/PostUseCases";
import { z } from "zod";

const updatePostSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  content: z.string().min(1).max(50000).optional(),
  isPinned: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/community/posts/[id] - Get single post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { postRepository, voteRepository } = createRepositories();
    const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);

    const post = await getPostByIdUseCase.execute(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get user vote if authenticated
    const session = await getServerSession(authOptions);
    let userVote = 0;

    if (session?.user?.id) {
      const vote = await voteRepository.findByUserAndPost(
        session.user.id,
        post.id
      );
      userVote = vote?.value ?? 0;
    }

    return NextResponse.json({ ...post, userVote });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT /api/community/posts/[id] - Update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updatePostSchema.parse(body);

    const { postRepository } = createRepositories();
    const updatePostUseCase = new UpdatePostUseCase(postRepository);

    const post = await updatePostUseCase.execute(
      { id, ...validatedData },
      session.user.id,
      session.user.role === "ADMIN"
    );

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message === "Unauthorized to update this post") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/community/posts/[id] - Delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { postRepository } = createRepositories();
    const deletePostUseCase = new DeletePostUseCase(postRepository);

    await deletePostUseCase.execute(
      id,
      session.user.id,
      session.user.role === "ADMIN"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message === "Unauthorized to delete this post") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
