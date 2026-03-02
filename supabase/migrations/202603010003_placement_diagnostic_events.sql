-- Placement diagnostic audit history for submit + manual override events.

create table if not exists public.placement_diagnostic_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid not null references public.student_profiles(id) on delete cascade,
  event_type text not null,
  stage_id text not null,
  recommended_stage_id text,
  confidence numeric(6, 4),
  score numeric(6, 4),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint placement_diagnostic_events_event_type_check
    check (event_type in ('diagnostic_submitted', 'manual_override')),
  constraint placement_diagnostic_events_stage_id_check
    check (stage_id in ('pre-k', 'early-elem', 'upper-elem', 'middle', 'high', 'college')),
  constraint placement_diagnostic_events_recommended_stage_id_check
    check (
      recommended_stage_id is null
      or recommended_stage_id in ('pre-k', 'early-elem', 'upper-elem', 'middle', 'high', 'college')
    )
);

create index if not exists idx_placement_diagnostic_events_user_created
  on public.placement_diagnostic_events(user_id, created_at desc);

create index if not exists idx_placement_diagnostic_events_profile_created
  on public.placement_diagnostic_events(profile_id, created_at desc);

create index if not exists idx_placement_diagnostic_events_user_type_created
  on public.placement_diagnostic_events(user_id, event_type, created_at desc);

alter table public.placement_diagnostic_events enable row level security;

drop policy if exists "placement_diagnostic_events_select_own" on public.placement_diagnostic_events;
create policy "placement_diagnostic_events_select_own"
on public.placement_diagnostic_events
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "placement_diagnostic_events_insert_own" on public.placement_diagnostic_events;
create policy "placement_diagnostic_events_insert_own"
on public.placement_diagnostic_events
for insert
to authenticated
with check (auth.uid() = user_id);
