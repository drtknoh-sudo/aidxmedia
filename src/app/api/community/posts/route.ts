import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infrastructure/web/auth/auth";
import { createRepositories } from "@/adapters/gateways/prisma-repositories";
import {
  CreatePostUseCase,
  GetPostsUseCase,
} from "@/core/use-cases/PostUseCases";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1).max(300),
  content: z.string().min(1).max(50000),
});

const querySchema = z.object({
  sort: z.enum(["hot", "new", "top"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  adminOnly: z
    .string()
    .transform((v) => v === "true")
    .optional(),
});

// GET /api/community/posts - List posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = querySchema.parse({
      sort: searchParams.get("sort") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      adminOnly: searchParams.get("adminOnly") ?? undefined,
    });

    const { postRepository } = createRepositories();
    const getPostsUseCase = new GetPostsUseCase(postRepository);

    const result = await getPostsUseCase.execute({
      sort: query.sort,
      page: query.page,
      limit: query.limit,
      adminOnly: query.adminOnly,
    });

    // Get user votes if authenticated
    const session = await getServerSession(authOptions);
    let userVotes: Record<string, number> = {};

    if (session?.user?.id) {
      const { voteRepository } = createRepositories();
      const postIds = result.posts.map((p) => p.id);
      const votes = await voteRepository.findUserVotesForPosts(
        session.user.id,
        postIds
      );
      userVotes = votes.reduce(
        (acc, v) => {
          if (v.postId) acc[v.postId] = v.value;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    return NextResponse.json({
      ...result,
      userVotes,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/community/posts - Create post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createPostSchema.parse(body);

    const { postRepository } = createRepositories();
    const createPostUseCase = new CreatePostUseCase(postRepository);

    const post = await createPostUseCase.execute({
      ...validatedData,
      authorId: session.user.id,
      isAdminPost: session.user.role === "ADMIN",
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
