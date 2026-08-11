
-- Drop tables if they exist to start fresh
drop table if exists public.plc_action_items cascade;
drop table if exists public.plc_instructional_responses cascade;
drop table if exists public.plc_group_members cascade;
drop table if exists public.plc_student_groups cascade;
drop table if exists public.plc_evidence cascade;
drop table if exists public.plc_discussions cascade;
drop table if exists public.plc_meetings cascade;
drop table if exists public.plc_team_members cascade;
drop table if exists public.plc_teams cascade;

-- 1. Create PLC Teams
create table public.plc_teams (
    id uuid primary key default gen_random_uuid(),
    school_id uuid not null references public.schools(id) on delete cascade,
    name text not null,
    created_at timestamptz default now()
);

-- 2. Create PLC Team Members
create table public.plc_team_members (
    id uuid primary key default gen_random_uuid(),
    team_id uuid not null references public.plc_teams(id) on delete cascade,
    user_id uuid not null references public.users(id) on delete cascade,
    is_leader boolean not null default false,
    unique(team_id, user_id)
);

-- 3. Create PLC Meetings
create table public.plc_meetings (
    id uuid primary key default gen_random_uuid(),
    team_id uuid not null references public.plc_teams(id) on delete cascade,
    date timestamptz not null default now(),
    facilitator_id uuid not null references public.users(id) on delete restrict,
    objective text not null,
    standard text not null,
    learning_target text not null,
    success_criteria text not null,
    status text not null check (status in ('draft', 'completed')),
    previous_meeting_id uuid references public.plc_meetings(id) on delete set null,
    created_at timestamptz default now()
);

-- 4. Create PLC Discussions
create table public.plc_discussions (
    id uuid primary key default gen_random_uuid(),
    meeting_id uuid not null references public.plc_meetings(id) on delete cascade,
    question_key text not null,
    response_text text not null,
    unique(meeting_id, question_key)
);

-- 5. Create PLC Evidence
create table public.plc_evidence (
    id uuid primary key default gen_random_uuid(),
    meeting_id uuid not null references public.plc_meetings(id) on delete cascade,
    class_id uuid not null references public.classes(id) on delete cascade,
    student_id uuid references public.students(id) on delete cascade,
    standard text not null,
    skill_id uuid references public.skills(id) on delete set null,
    evidence_type text not null check (evidence_type in ('formative', 'exit_ticket', 'work_sample', 'common_assessment', 'performance_task', 'observation', 'skill_tracking')),
    evidence_notes text not null,
    score int check (score >= 1 and score <= 4),
    collected_date date not null
);

-- 6. Create PLC Student Groups
create table public.plc_student_groups (
    id uuid primary key default gen_random_uuid(),
    meeting_id uuid not null references public.plc_meetings(id) on delete cascade,
    name text not null check (name in ('Intensive Support', 'Strategic Support', 'Approaching Proficiency', 'Proficient', 'Ready for Extension')),
    learning_target text not null,
    created_at timestamptz default now()
);

-- 7. Create PLC Group Members
create table public.plc_group_members (
    id uuid primary key default gen_random_uuid(),
    group_id uuid not null references public.plc_student_groups(id) on delete cascade,
    student_id uuid not null references public.students(id) on delete cascade,
    unique(group_id, student_id)
);

-- 8. Create PLC Instructional Responses
create table public.plc_instructional_responses (
    id uuid primary key default gen_random_uuid(),
    group_id uuid not null references public.plc_student_groups(id) on delete cascade,
    response_type text not null,
    strategy text not null,
    responsible_teacher_id uuid not null references public.users(id) on delete restrict,
    start_date date not null,
    followup_date date not null,
    materials text not null,
    expected_improvement text not null
);

-- 9. Create PLC Action Items
create table public.plc_action_items (
    id uuid primary key default gen_random_uuid(),
    meeting_id uuid not null references public.plc_meetings(id) on delete cascade,
    group_id uuid references public.plc_student_groups(id) on delete set null,
    action text not null,
    owner_id uuid not null references public.users(id) on delete restrict,
    deadline date not null,
    status text not null check (status in ('Not Started', 'In Progress', 'Completed', 'Needs Revision')),
    evidence_to_collect text not null,
    followup_date date not null
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.plc_teams enable row level security;
alter table public.plc_team_members enable row level security;
alter table public.plc_meetings enable row level security;
alter table public.plc_discussions enable row level security;
alter table public.plc_evidence enable row level security;
alter table public.plc_student_groups enable row level security;
alter table public.plc_group_members enable row level security;
alter table public.plc_instructional_responses enable row level security;
alter table public.plc_action_items enable row level security;

-- Policies
create policy "Read teams" on public.plc_teams for select using ( true );
create policy "Insert teams" on public.plc_teams for insert with check ( true );

create policy "Read team members" on public.plc_team_members for select using ( true );
create policy "Manage team members" on public.plc_team_members for all using ( true );

create policy "Read meetings" on public.plc_meetings for select using ( true );
create policy "Insert/Update meetings" on public.plc_meetings for all using ( true );

create policy "Read discussions" on public.plc_discussions for select using ( true );
create policy "Manage discussions" on public.plc_discussions for all using ( true );

create policy "Read evidence" on public.plc_evidence for select using ( true );
create policy "Manage evidence" on public.plc_evidence for all using ( true );

create policy "Read student groups" on public.plc_student_groups for select using ( true );
create policy "Manage student groups" on public.plc_student_groups for all using ( true );

create policy "Read group members" on public.plc_group_members for select using ( true );
create policy "Manage group members" on public.plc_group_members for all using ( true );

create policy "Read instructional responses" on public.plc_instructional_responses for select using ( true );
create policy "Manage instructional responses" on public.plc_instructional_responses for all using ( true );

create policy "Read action items" on public.plc_action_items for select using ( true );
create policy "Manage action items" on public.plc_action_items for all using ( true );
