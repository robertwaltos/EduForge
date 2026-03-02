import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { skills } from "@/lib/data/curriculum";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { resolveVerifiedParentAccess } from "@/lib/compliance/parent-access";

const digestSchema = z.object({
  parentId: z.string().uuid().optional(),
});

const shouldLogDigestPreview =
  process.env.NODE_ENV !== "production" && process.env.DEBUG_PARENT_DIGEST === "1";

function logDigestPreview(message: string) {
  if (shouldLogDigestPreview) {
    console.info(message);
  }
}

// This is the same logic as the parent dashboard page.
// In a real app, this would be refactored into a shared helper.
async function getChildDataForDigest(supabase: SupabaseClient, childUserId: string) {
  const { data: childProfile, error: childError } = await supabase
    .from("user_profiles")
    .select("user_id, display_name")
    .eq("user_id", childUserId)
    .single();

  if (childError || !childProfile) {
    return { error: "No child found." };
  }

  const { data: childSkills, error: skillsError } = await supabase
    .from("user_skill_mastery")
    .select("skill_id, mastery_level")
    .eq("user_id", childProfile.user_id)
    .order("mastery_level", { ascending: false });

  if (skillsError) {
    return { error: "Could not fetch child's progress." };
  }

  return { childProfile, childSkills };
}

export async function POST(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:parent:digest", {
      max: 20,
      windowMs: 5 * 60 * 1000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many digest requests. Please retry shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = digestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (validation.data.parentId && validation.data.parentId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden parent context." },
        { status: 403 },
      );
    }

    const parentAccess = await resolveVerifiedParentAccess({
      supabase,
      userId: user.id,
      userEmail: user.email,
      purpose: "parent_digest",
    });
    if (!parentAccess.ok) {
      if (parentAccess.status === 403) {
        return NextResponse.json({ error: parentAccess.error }, { status: 403 });
      }
      return NextResponse.json({ error: "Internal server error." }, { status: parentAccess.status });
    }

    const targetChildUserId = parentAccess.childUserIds[0];
    if (!targetChildUserId) {
      return NextResponse.json({ error: "No verified child found." }, { status: 404 });
    }

    const { childProfile, childSkills, error } =
      await getChildDataForDigest(supabase, targetChildUserId);

    if (error || !childSkills) {
      return NextResponse.json({ error: error || "Child skills not found." }, { status: 404 });
    }

    const skillMap = new Map(skills.map((s) => [s.id, s.name]));
    const strengths = childSkills.slice(0, 3);
    const weaknesses = childSkills
      .filter((s) => s.mastery_level < 0.7)
      .slice(-3)
      .reverse();
    
    // --- MOCK EMAIL SENDING ---
    logDigestPreview("--- Mock Parent Digest Email ---");
    logDigestPreview(`To: ${parentAccess.parentEmail}`);
    logDigestPreview(`Subject: Your child ${childProfile.display_name}'s weekly progress report!`);
    logDigestPreview("\n--- Wins ---");
    strengths.forEach((s) => logDigestPreview(`- ${skillMap.get(s.skill_id)}`));
    logDigestPreview("\n--- Opportunities ---");
    weaknesses.forEach((s) => logDigestPreview(`- ${skillMap.get(s.skill_id)}`));
    logDigestPreview("\n--- What to do tonight (10 mins) ---");
    const advice = weaknesses.length > 0 ? (skillMap.get(weaknesses[0].skill_id) ?? weaknesses[0].skill_id) : "reviewing past lessons";
    logDigestPreview(`- Practice ${advice} with them.`);
    logDigestPreview("-----------------------------");
    // In a real app, you'd use a service like Resend or SendGrid here.
    // --- END MOCK EMAIL SENDING ---

    return NextResponse.json({ success: true, message: "Digest generated." });
  } catch (err) {
    console.error("Unexpected error in digest route:", toSafeErrorRecord(err));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
