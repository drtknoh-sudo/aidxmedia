import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * API Route for revalidating pages when Notion content changes
 *
 * Usage:
 * POST /api/revalidate
 * Headers: { "Authorization": "Bearer YOUR_REVALIDATE_SECRET" }
 * Body: { "path": "/news", "category": "news" } (optional)
 *
 * This can be called from:
 * 1. Notion webhook (via automation tools like Make/Zapier)
 * 2. Manual trigger when you update content
 * 3. Scheduled cron job for regular updates
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.REVALIDATE_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { path, category } = body;

    // Revalidate specific path or all content paths
    if (path) {
      revalidatePath(path);
    } else if (category) {
      revalidatePath(`/${category}`);
    } else {
      // Revalidate all content pages
      revalidatePath("/");
      revalidatePath("/news");
      revalidatePath("/research");
      revalidatePath("/commentary");
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for manual testing
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.REVALIDATE_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Revalidate all
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/research");
  revalidatePath("/commentary");

  return NextResponse.json({
    success: true,
    message: "All content paths revalidated",
    timestamp: new Date().toISOString(),
  });
}
