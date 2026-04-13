
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkReady() {
  console.log('--- Verificando Ecossistema de Demonstração ---');

  // 1. Verificar Admin
  const { data: admin, error: adminErr } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('email', 'admin@aegis.pt')
    .single();

  if (adminErr || !admin) {
    console.error('❌ Admin admin@aegis.pt não encontrado.');
  } else {
    console.log('✅ Admin encontrado:', admin.email, `(Role: ${admin.role})`);
  }

  // 2. Verificar ACME Tenant (Fallback)
  const { data: acme, error: acmeErr } = await supabase
    .from('tenants')
    .select('id, name, slug')
    .eq('slug', 'acme-corp')
    .single();

  if (acmeErr || !acme) {
    console.error('❌ Tenant ACME (acme-corp) não encontrado. Fallbacks podem falhar.');
  } else {
    console.log('✅ Tenant ACME encontrado:', acme.name, `[ID: ${acme.id}]`);
  }

  // 3. Verificar se há dados na RH (para não mostrar dashboard vazio)
  const { data: employees, count } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', acme?.id as any);
  
  console.log(`📊 Dados ACME: ${count} colaboradores encontrados.`);
}

checkReady().catch(console.error);
