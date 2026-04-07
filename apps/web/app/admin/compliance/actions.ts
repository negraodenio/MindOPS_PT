"use server";

import { createClient } from "../../../utils/supabase/server";
import { getAnexoDStats } from "@mindops/database";
import { AnexoDReportData } from "@mindops/domain";

export async function getAnexoDDataAction(tenantId?: string): Promise<AnexoDReportData> {
  const supabase = await createClient();
  
  // No mundo real, usaríamos o tenantId da sessão do utilizador logado.
  // Mock Tenant para SafeHorizon
  const TARGET_TENANT = tenantId || "00000000-0000-0000-0000-000000000001";
  
  return getAnexoDStats(supabase as any, TARGET_TENANT);
}
