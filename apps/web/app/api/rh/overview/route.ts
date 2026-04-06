import { NextResponse } from "next/server";
import { getRHOverview } from "@mindops/database";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const QuerySchema = z.object({
  tenantId: z.string().uuid()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get("tenantId");

  const parsed = QuerySchema.safeParse({ tenantId });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid tenantId" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const data = await getRHOverview(supabase as any, parsed.data.tenantId);
    return NextResponse.json(data);
  } catch (error) {
    console.error("RH Overview Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
