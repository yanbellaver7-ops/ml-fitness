-- Evolução Clínica
create table if not exists public.evolucao (
  id          uuid primary key default gen_random_uuid(),
  paciente_id uuid references auth.users(id) on delete cascade not null,
  data        text not null default '',
  peso        float not null default 0,
  pressao     text not null default '',
  sintomas    text not null default '',
  observacoes text not null default '',
  status      text not null default 'neutro',
  created_at  timestamptz default now()
);
alter table public.evolucao enable row level security;
create policy "evolucao: owner read" on public.evolucao for select using (auth.uid() = paciente_id);

-- Histórico Médico
create table if not exists public.historico_medico (
  id                   uuid primary key default gen_random_uuid(),
  paciente_id          uuid references auth.users(id) on delete cascade not null,
  doencas              text[] default '{}',
  alergias             text[] default '{}',
  cirurgias            jsonb default '[]',
  antecedente_familiar text[] default '{}',
  tipo_sanguineo       text default '',
  altura               text default '',
  peso                 text default '',
  imc                  text default '',
  created_at           timestamptz default now()
);
alter table public.historico_medico enable row level security;
create policy "historico: owner read" on public.historico_medico for select using (auth.uid() = paciente_id);

-- Exames
create table if not exists public.exames (
  id          uuid primary key default gen_random_uuid(),
  paciente_id uuid references auth.users(id) on delete cascade not null,
  nome        text not null default '',
  data        text not null default '',
  status      text not null default 'pendente',
  resultado   text,
  created_at  timestamptz default now()
);
alter table public.exames enable row level security;
create policy "exames: owner read" on public.exames for select using (auth.uid() = paciente_id);

-- Prescrições
create table if not exists public.prescricoes (
  id           uuid primary key default gen_random_uuid(),
  paciente_id  uuid references auth.users(id) on delete cascade not null,
  medicamento  text not null default '',
  dosagem      text not null default '',
  frequencia   text not null default '',
  duracao      text not null default '',
  inicio       text not null default '',
  status       text not null default 'ativo',
  created_at   timestamptz default now()
);
alter table public.prescricoes enable row level security;
create policy "prescricoes: owner read" on public.prescricoes for select using (auth.uid() = paciente_id);

-- Plano Alimentar
create table if not exists public.plano_alimentar (
  id          uuid primary key default gen_random_uuid(),
  paciente_id uuid references auth.users(id) on delete cascade not null,
  restricoes  text[] default '{}',
  calorias    int default 0,
  plano       jsonb default '[]',
  created_at  timestamptz default now()
);
alter table public.plano_alimentar enable row level security;
create policy "plano: owner read" on public.plano_alimentar for select using (auth.uid() = paciente_id);
