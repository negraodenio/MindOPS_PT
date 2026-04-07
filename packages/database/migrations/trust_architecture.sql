-- [AEGIS TRUST ARCHITECTURE - PRODUCTION HARDENING]

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. TOKENIZATION (Airlock Layer)
create table if not exists assessment_tokens (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id) on delete cascade,
  employee_ref text not null, 
  token_hash text not null unique,
  expires_at timestamp with time zone not null default (now() + interval '24 hours'),
  used_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- 3. CLINICAL (Siloed Layer - NO PII)
create table if not exists clinical_assessments (
  id uuid primary key default uuid_generate_v4(),
  token_hash text not null unique, 
  tenant_id uuid references tenants(id) on delete cascade,
  protocol_version text default 'AEGIS-V1.2',
  created_at timestamp with time zone default now()
);

create table if not exists clinical_answers (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references clinical_assessments(id) on delete cascade,
  question_id text not null,
  answer_value numeric not null,
  created_at timestamp with time zone default now()
);

create table if not exists clinical_risk_scores (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references clinical_assessments(id) on delete cascade,
  composite_risk_score numeric not null,
  risk_level text check (risk_level in ('low', 'medium', 'high', 'critical')),
  reasons text[],
  confidence numeric,
  metadata jsonb, -- Inferred voice signal metadata (no audio)
  scored_at timestamp with time zone default now()
);

-- 4. GOVERNANCE (M2.7 Audit Layer)
create table if not exists ai_governance_decisions (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references clinical_assessments(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete cascade,
  model_version text default 'AEGIS-HUB-2.7',
  input_hash text,
  logic_path jsonb, -- M2.7 Explainability
  confidence numeric,
  created_at timestamp with time zone default now()
);

-- 5. RLS (ROW LEVEL SECURITY) - BLINDAGEM TOTAL

-- Enable RLS on all sensitive tables
alter table assessment_tokens enable row level security;
alter table clinical_assessments enable row level security;
alter table clinical_answers enable row level security;
alter table clinical_risk_scores enable row level security;
alter table ai_governance_decisions enable row level security;

-- Policies: Base de Dados só acessível via Tenant
create policy "Tenant isolation: assessment_tokens" on assessment_tokens
  for all using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

create policy "Tenant isolation: clinical_assessments" on clinical_assessments
  for all using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

create policy "Tenant isolation: clinical_answers" on clinical_answers
  for all using (assessment_id in (select id from clinical_assessments where tenant_id = (auth.jwt() ->> 'tenant_id')::uuid));

create policy "Tenant isolation: clinical_risk_scores" on clinical_risk_scores
  for all using (assessment_id in (select id from clinical_assessments where tenant_id = (auth.jwt() ->> 'tenant_id')::uuid));

create policy "Tenant isolation: ai_governance" on ai_governance_decisions
  for all using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- 6. AUDIT LOGS (Immutable)
create table if not exists enterprise_audit_logs (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id),
  actor_id uuid,
  action text not null,
  resource text not null,
  timestamp timestamp with time zone default now()
);

alter table enterprise_audit_logs enable row level security;
create policy "Tenant isolation: audit_logs" on enterprise_audit_logs 
  for select using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- 7. COMMITTED: Data Silence Rule
-- RH só vê agregados. O endpoint de leitura deve forçar agregação se a role != 'dpo' ou 'admin'.
