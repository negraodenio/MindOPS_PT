import { createClient } from './apps/web/utils/supabase/server';

async function checkResources() {
  const supabase = await createClient();
  
  // Check users
  const { data: users, error: userError } = await supabase.from('profiles').select('email, role').eq('email', 'admin@aegis.pt');
  console.log('--- Admin Check ---');
  console.log(users, userError);

  // Check ACME tenant (the fallback one)
  const { data: tenants, error: tenantError } = await supabase.from('tenants').select('id, name, slug').eq('slug', 'acme-corp');
  console.log('--- Tenant Check ---');
  console.log(tenants, tenantError);
}

checkResources();
