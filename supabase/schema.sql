create extension if not exists "pgcrypto";

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  birth_date date,
  age_group text,
  theme_pack text default 'simple',
  theme_mode text default 'system',
  motion_pref text default 'standard',
  contrast_pref text default 'standard',
  parent_email text,
  parental_consent_required boolean not null default false,
  parental_consent_status text not null default 'not_required',
  is_admin boolean not null default false,
  is_parent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_profiles_consent_status_check
    check (parental_consent_status in ('not_required', 'pending', 'verified', 'denied'))
);

alter table public.user_profiles add column if not exists theme_pack text default 'simple';
alter table public.user_profiles add column if not exists theme_mode text default 'system';
alter table public.user_profiles add column if not exists motion_pref text default 'standard';
alter table public.user_profiles add column if not exists contrast_pref text default 'standard';

alter table public.user_profiles drop constraint 
if exists user_profiles_theme_pack_check;
alter table public.user_profiles add constraint user_profiles_theme_pack_check
  check (theme_pack in ('simple', 'sunrise', 'ocean', 'forest', 'candy', 'space'));

alter table public.user_profiles drop constraint if exists user_profiles_theme_mode_check;
alter table public.user_profiles add constraint user_profiles_theme_mode_check
  check (theme_mode in ('system', 'light'));

alter table public.user_profiles drop constraint if exists user_profiles_motion_pref_check;
alter table public.user_profiles add constraint user_profiles_motion_pref_check
  check (motion_pref in ('standard'));

alter table public.user_profiles drop constraint if exists user_profiles_contrast_pref_check;
alter table public.user_profiles add constraint user_profiles_contrast_pref_check
  check (contrast_pref in ('standard', 'high'));

create table if not exists public.user_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month_key text not null,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  spent_usd numeric(12, 6) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, month_key)
);

create table if not exists public.parent_consents (
  id uuid primary key default gen_random_uuid(),
  child_user_id uuid not null references auth.users(id) on delete cascade,
  parent_email text not null,
  consent_method text not null default 'email_verification',
  status text not null default 'pending_verification',
  consent_version text not null default 'v1',
  region text,
  ip_address text,
  evidence jsonb,
  requested_at timestamptz not null default now(),
  verified_at timestamptz,
  constraint parent_consents_status_check
    check (status in ('pending_verification', 'verified', 'denied', 'expired')),
  constraint parent_consents_method_check
    check (consent_method in ('email_verification', 'micro_charge', 'id_check'))
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dsar_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  request_type text not null,
  status text not null default 'pending',
  details jsonb,
  requested_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint dsar_request_type_check
    check (request_type in ('access', 'erasure', 'rectification', 'portability', 'restriction')),
  constraint dsar_status_check
    check (status in ('pending', 'in_progress', 'completed', 'rejected'))
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_set_updated_at on public.user_profiles;
create trigger user_profiles_set_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();

drop trigger if exists user_tokens_set_updated_at on public.user_tokens;
create trigger user_tokens_set_updated_at
before update on public.user_tokens
for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

alter table public.user_profiles enable row level security;
alter table public.user_tokens enable row level security;
alter table public.parent_consents enable row level security;
alter table public.subscriptions enable row level security;
alter table public.dsar_requests enable row level security;

drop policy if exists "profiles_select_own" on public.user_profiles;
create policy "profiles_select_own"
on public.user_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.user_profiles;
create policy "profiles_update_own"
on public.user_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "tokens_select_own" on public.user_tokens;
create policy "tokens_select_own"
on public.user_tokens
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "tokens_insert_own" on public.user_tokens;
create policy "tokens_insert_own"
on public.user_tokens
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "parent_consents_select_child" on public.parent_consents;
create policy "parent_consents_select_child"
on public.parent_consents
for select
to authenticated
using (auth.uid() = child_user_id);

drop policy if exists "parent_consents_insert_child" on public.parent_consents;
create policy "parent_consents_insert_child"
on public.parent_consents
for insert
to authenticated
with check (auth.uid() = child_user_id);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
on public.subscriptions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "dsar_select_own" on public.dsar_requests;
create policy "dsar_select_own"
on public.dsar_requests
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "dsar_insert_own" on public.dsar_requests;
create policy "dsar_insert_own"
on public.dsar_requests
for insert
to authenticated
with check (auth.uid() = user_id);

create table if not exists public.user_learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  repetitions integer not null default 0,
  easiness_factor numeric(4, 2) not null default 2.5,
  interval integer not null default 0, -- in days
  next_review_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.user_learning_progress enable row level security;

drop policy if exists "progress_select_own" on public.user_learning_progress;
create policy "progress_select_own"
on public.user_learning_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.user_learning_progress;
create policy "progress_insert_own"
on public.user_learning_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.user_learning_progress;
create policy "progress_update_own"
on public.user_learning_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop trigger if exists user_learning_progress_set_updated_at on public.user_learning_progress;
create trigger user_learning_progress_set_updated_at
before update on public.user_learning_progress
for each row execute function public.set_updated_at();

create table if not exists public.user_skill_mastery (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill_id text not null,
  mastery_level numeric(4, 2) not null default 0.00,
  attempts integer not null default 0,
  correct_attempts integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, skill_id)
);

alter table public.user_skill_mastery enable row level security;

drop policy if exists "skill_mastery_select_own" on public.user_skill_mastery;
create policy "skill_mastery_select_own"
on public.user_skill_mastery
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "skill_mastery_insert_own" on public.user_skill_mastery;
create policy "skill_mastery_insert_own"
on public.user_skill_mastery
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "skill_mastery_update_own" on public.user_skill_mastery;
create policy "skill_mastery_update_own"
on public.user_skill_mastery
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop trigger if exists user_skill_mastery_set_updated_at on public.user_skill_mastery;
create trigger user_skill_mastery_set_updated_at
before update on public.user_skill_mastery
for each row execute function public.set_updated_at();

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_action_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete cascade,
  action_type text not null,
  target_user_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  description text,
  status text not null default 'open',
  priority text not null default 'normal',
  assigned_to uuid references auth.users(id) on delete set null,
  resolution_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint support_tickets_status_check
    check (status in ('open', 'in_progress', 'resolved', 'closed')),
  constraint support_tickets_priority_check
    check (priority in ('low', 'normal', 'high', 'urgent'))
);

create table if not exists public.sales_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  promo_code text not null,
  discount_percent integer not null,
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions integer,
  stripe_coupon_id text,
  stripe_promotion_code_id text,
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists support_tickets_set_updated_at on public.support_tickets;
create trigger support_tickets_set_updated_at
before update on public.support_tickets
for each row execute function public.set_updated_at();

drop trigger if exists sales_events_set_updated_at on public.sales_events;
create trigger sales_events_set_updated_at
before update on public.sales_events
for each row execute function public.set_updated_at();

drop trigger if exists app_settings_set_updated_at on public.app_settings;
create trigger app_settings_set_updated_at
before update on public.app_settings
for each row execute function public.set_updated_at();

alter table public.app_settings enable row level security;
alter table public.admin_action_logs enable row level security;
alter table public.support_tickets enable row level security;
alter table public.sales_events enable row level security;

drop policy if exists "support_tickets_select_own_or_admin" on public.support_tickets;
create policy "support_tickets_select_own_or_admin"
on public.support_tickets
for select
to authenticated
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.user_profiles up
    where up.user_id = auth.uid() and up.is_admin = true
  )
);

drop policy if exists "support_tickets_insert_own" on public.support_tickets;
create policy "support_tickets_insert_own"
on public.support_tickets
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "support_tickets_update_admin_only" on public.support_tickets;
create policy "support_tickets_update_admin_only"
on public.support_tickets
for update
to authenticated
using (
  exists (
    select 1 from public.user_profiles up
    where up.user_id = auth.uid() and up.is_admin = true
  )
)
with check (
  exists (
    select 1 from public.user_profiles up
    where up.user_id = auth.uid() and up.is_admin = true
  )
);

create table if not exists public.policy_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  policy_type text not null,
  policy_version text not null,
  accepted_at timestamptz not null default now(),
  constraint policy_acceptances_policy_type_check
    check (policy_type in ('privacy', 'terms', 'refunds')),
  unique (user_id, policy_type, policy_version)
);

alter table public.policy_acceptances enable row level security;

drop policy if exists "policy_acceptances_select_own" on public.policy_acceptances;
create policy "policy_acceptances_select_own"
on public.policy_acceptances
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "policy_acceptances_insert_own" on public.policy_acceptances;
create policy "policy_acceptances_insert_own"
on public.policy_acceptances
for insert
to authenticated
with check (auth.uid() = user_id);

create table if not exists public.admin_alerts (
  id uuid primary key default gen_random_uuid(),
  severity text not null default 'warning',
  category text not null,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  acknowledged boolean not null default false,
  acknowledged_by uuid references auth.users(id) on delete set null,
  acknowledged_at timestamptz,
  created_at timestamptz not null default now(),
  constraint admin_alerts_severity_check check (severity in ('info', 'warning', 'critical'))
);

create table if not exists public.admin_rate_limit_events (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete cascade,
  action_type text not null,
  window_seconds integer not null,
  max_actions integer not null,
  observed_actions integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_report_exports (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete cascade,
  report_type text not null,
  format text not null default 'csv',
  status text not null default 'completed',
  row_count integer not null default 0,
  checksum_sha256 text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  constraint admin_report_exports_status_check check (status in ('running', 'completed', 'failed'))
);

alter table public.admin_alerts enable row level security;
alter table public.admin_rate_limit_events enable row level security;
alter table public.admin_report_exports enable row level security;

create table if not exists public.admin_approval_requests (
  id uuid primary key default gen_random_uuid(),
  action_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  requested_by uuid not null references auth.users(id) on delete cascade,
  approved_by uuid references auth.users(id) on delete set null,
  rejected_by uuid references auth.users(id) on delete set null,
  executed_by uuid references auth.users(id) on delete set null,
  reason text,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  rejected_at timestamptz,
  executed_at timestamptz,
  expires_at timestamptz not null default (now() + interval '24 hours'),
  constraint admin_approval_requests_status_check
    check (status in ('pending', 'approved', 'rejected', 'expired', 'executed'))
);

create table if not exists public.admin_alert_notifications (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid not null references public.admin_alerts(id) on delete cascade,
  channel text not null default 'email',
  recipient text not null,
  status text not null default 'queued',
  error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  constraint admin_alert_notifications_status_check
    check (status in ('queued', 'sent', 'failed'))
);

create table if not exists public.admin_report_jobs (
  id uuid primary key default gen_random_uuid(),
  report_type text not null,
  status text not null default 'queued',
  requested_by uuid not null references auth.users(id) on delete cascade,
  run_after timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint admin_report_jobs_status_check
    check (status in ('queued', 'running', 'completed', 'failed'))
);

alter table public.admin_approval_requests enable row level security;
alter table public.admin_alert_notifications enable row level security;
alter table public.admin_report_jobs enable row level security;

create table if not exists public.media_generation_jobs (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references auth.users(id) on delete cascade,
  module_id text,
  lesson_id text,
  asset_type text not null,
  provider text not null default 'seedance',
  prompt text not null,
  status text not null default 'queued',
  output_url text,
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint media_generation_jobs_asset_type_check
    check (asset_type in ('video', 'animation', 'image')),
  constraint media_generation_jobs_status_check
    check (status in ('queued', 'running', 'completed', 'failed', 'canceled'))
);

drop trigger if exists media_generation_jobs_set_updated_at on public.media_generation_jobs;
create trigger media_generation_jobs_set_updated_at
before update on public.media_generation_jobs
for each row execute function public.set_updated_at();

alter table public.media_generation_jobs enable row level security;

drop policy if exists "media_jobs_select_own_or_admin" on public.media_generation_jobs;
create policy "media_jobs_select_own_or_admin"
on public.media_generation_jobs
for select
to authenticated
using (
  auth.uid() = created_by
  or exists (
    select 1 from public.user_profiles up
    where up.user_id = auth.uid() and up.is_admin = true
  )
);

drop policy if exists "media_jobs_insert_own" on public.media_generation_jobs;
create policy "media_jobs_insert_own"
on public.media_generation_jobs
for insert
to authenticated
with check (auth.uid() = created_by);

drop policy if exists "media_jobs_update_admin_only" on public.media_generation_jobs;
create policy "media_jobs_update_admin_only"
on public.media_generation_jobs
for update
to authenticated
using (
  exists (
    select 1 from public.user_profiles up
    where up.user_id = auth.uid() and up.is_admin = true
  )
)
with check (
  exists (
    select 1 from public.user_profiles up
    where up.user_id = auth.uid() and up.is_admin = true
  )
);

create index if not exists idx_user_tokens_user_month
  on public.user_tokens(user_id, month_key);

create index if not exists idx_user_tokens_month
  on public.user_tokens(month_key);

create index if not exists idx_parent_consents_parent_email_status
  on public.parent_consents(parent_email, status);

create index if not exists idx_dsar_requests_status_requested_at
  on public.dsar_requests(status, requested_at desc);

create index if not exists idx_support_tickets_status_priority_created
  on public.support_tickets(status, priority, created_at desc);

create index if not exists idx_support_tickets_user_created
  on public.support_tickets(user_id, created_at desc);

create index if not exists idx_admin_alerts_acknowledged_created
  on public.admin_alerts(acknowledged, created_at desc);

create index if not exists idx_admin_approval_requests_status_created
  on public.admin_approval_requests(status, created_at desc);

create index if not exists idx_media_jobs_status_created
  on public.media_generation_jobs(status, created_at desc);

create index if not exists idx_media_jobs_lesson_status
  on public.media_generation_jobs(lesson_id, status, created_at desc);

create index if not exists idx_media_jobs_module_status
  on public.media_generation_jobs(module_id, status, created_at desc);
