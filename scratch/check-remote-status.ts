import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  const { count: tenantCount } = await supabase.from('tenants').select('*', { count: 'exact', head: true });
  const { count: userCount } = await supabase.auth.admin.listUsers();
  
  console.log(`📊 Status do Banco Remoto (${supabaseUrl}):`);
  console.log(`- Tenants: ${tenantCount}`);
  console.log(`- Usuários de Autenticação: ${userCount}`);
}

checkData();
