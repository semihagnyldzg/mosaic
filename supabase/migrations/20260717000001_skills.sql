-- Migration to add skills tracking
create table public.skills (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    description text
);

create table public.student_skills (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.students(id) on delete cascade,
    skill_id uuid not null references public.skills(id) on delete cascade,
    evaluated_by uuid not null references public.users(id) on delete restrict,
    score int not null check (score >= 1 and score <= 4),
    evidence text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Enable RLS
alter table public.skills enable row level security;
alter table public.student_skills enable row level security;

-- Policies for skills
create policy "Allow all users to view skills" on public.skills
    for select using ( true );

-- Policies for student_skills (evidence logs)
create policy "Allow district admin to read all student skills in district" on public.student_skills
    for select using (
        exists (
            select 1 from public.users admin
            join public.user_roles on user_roles.user_id = admin.id
            join public.students on students.id = student_skills.student_id
            join public.schools on schools.id = students.school_id
            where admin.id = auth.uid()
              and user_roles.role = 'district_admin'
              and admin.district_id = schools.district_id
        )
    );

create policy "Allow principal to read all student skills in school" on public.student_skills
    for select using (
        exists (
            select 1 from public.users principal
            join public.user_roles on user_roles.user_id = principal.id
            join public.students on students.id = student_skills.student_id
            where principal.id = auth.uid()
              and user_roles.role = 'principal'
              and principal.school_id = students.school_id
        )
    );

create policy "Allow teachers to read student skills for classes they teach" on public.student_skills
    for select using (
        exists (
            select 1 from public.class_enrollments
            join public.classes on classes.id = class_enrollments.class_id
            where classes.teacher_id = auth.uid()
              and class_enrollments.student_id = student_skills.student_id
        )
    );

create policy "Allow teachers to insert student skills for classes they teach" on public.student_skills
    for insert with check (
        auth.uid() = evaluated_by and
        exists (
            select 1 from public.class_enrollments
            join public.classes on classes.id = class_enrollments.class_id
            where classes.teacher_id = auth.uid()
              and class_enrollments.student_id = student_skills.student_id
        )
    );
