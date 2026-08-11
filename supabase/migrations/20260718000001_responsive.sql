
-- Drop tables if they exist to start fresh
drop table if exists public.responsive_strategies cascade;
drop table if exists public.responsive_group_members cascade;
drop table if exists public.responsive_student_groups cascade;
drop table if exists public.responsive_evidence cascade;
drop table if exists public.responsive_cycles cascade;

-- 1. Create Responsive Cycles
create table public.responsive_cycles (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references public.users(id) on delete cascade,
    subject text not null check (subject in ('Science', 'Mathematics', 'English Language Arts')),
    grade_level text not null,
    standard text not null,
    lesson_unit text not null,
    learning_target text not null,
    success_criteria text not null,
    status text not null check (status in ('draft', 'active', 'archived')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. Create Responsive Evidence
create table public.responsive_evidence (
    id uuid primary key default gen_random_uuid(),
    cycle_id uuid not null references public.responsive_cycles(id) on delete cascade,
    student_id uuid not null references public.students(id) on delete cascade,
    class_id uuid not null references public.classes(id) on delete cascade,
    evidence_type text not null check (evidence_type in ('observation', 'student_work', 'exit_ticket', 'formative_assessment', 'quiz', 'performance_task', 'project', 'writing_sample', 'reading_conference', 'discussion', 'presentation', 'math_task', 'science_investigation', 'teacher_notes')),
    notes text not null,
    collected_date date not null
);

-- 3. Create Responsive Student Groups
create table public.responsive_student_groups (
    id uuid primary key default gen_random_uuid(),
    cycle_id uuid not null references public.responsive_cycles(id) on delete cascade,
    name text not null,
    notes text,
    created_at timestamptz default now()
);

-- 4. Create Responsive Group Members
create table public.responsive_group_members (
    id uuid primary key default gen_random_uuid(),
    group_id uuid not null references public.responsive_student_groups(id) on delete cascade,
    student_id uuid not null references public.students(id) on delete cascade,
    performance_level text not null check (performance_level in ('Beginning', 'Developing', 'Approaching Proficiency', 'Proficient', 'Advanced')),
    unique(group_id, student_id)
);

-- 5. Create Responsive Strategies
create table public.responsive_strategies (
    id uuid primary key default gen_random_uuid(),
    group_id uuid not null references public.responsive_student_groups(id) on delete cascade,
    strategy_name text not null,
    responsible_teacher_id uuid not null references public.users(id) on delete restrict,
    start_date date not null,
    followup_date date not null,
    evidence_to_collect text not null,
    notes text,
    status text not null check (status in ('Not Started', 'In Progress', 'Completed', 'Needs Revision'))
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.responsive_cycles enable row level security;
alter table public.responsive_evidence enable row level security;
alter table public.responsive_student_groups enable row level security;
alter table public.responsive_group_members enable row level security;
alter table public.responsive_strategies enable row level security;

-- Setup RLS Policies
create policy "All access for cycles" on public.responsive_cycles for all using ( true );
create policy "All access for evidence" on public.responsive_evidence for all using ( true );
create policy "All access for groups" on public.responsive_student_groups for all using ( true );
create policy "All access for members" on public.responsive_group_members for all using ( true );
create policy "All access for strategies" on public.responsive_strategies for all using ( true );
