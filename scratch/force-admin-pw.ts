import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceUpdate() {
  const email = 'admin@aegis.pt';
  const newPassword = 'Aegis@Demo2026';

  console.log(`🔐 Forçando atualização de password para ${email}...`);

  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("Erro ao listar utilizadores:", listError.message);
    return;
  }

  const user = listData.users.find(u => u.email === email);
  if (!user) {
    console.log("Utilizador não encontrado. Criando novo...");
    const { error: createError } = await supabase.auth.admin.createUser({
      email,
      password: newPassword,
      email_confirm: true,
      user_metadata: { role: 'manager', full_name: 'Administrador AEGIS' }
    });
    if (createError) console.error("Erro ao criar:", createError.message);
    else console.log("✅ Criado com sucesso.");
  } else {
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword
    });
    if (updateError) console.error("Erro ao atualizar password:", updateError.message);
    else console.log("✅ Password atualizada com sucesso.");
  }
}

forceUpdate();
