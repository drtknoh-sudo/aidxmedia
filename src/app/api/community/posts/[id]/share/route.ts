import { NextRequest, NextResponse } from "next/server";
import { createRepositories } from "@/adapters/gateways/prisma-repositories";
import { z } from "zod";

const shareSchema = z.object({
  platform: z.enum(["twitter", "facebook", "linkedin", "copy", "other"]),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/community/posts/[id]/share - Track share action
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: postId } = await params;
    const body = await request.json();
    const { platform } = shareSchema.parse(body);

    const { shareRepository } = createRepositories();
    await shareRepository.create(postId, platform);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error tracking share:", error);
    return NextResponse.json(
      { error: "Failed to track share" },
      { status: 500 }
    );
  }
}
