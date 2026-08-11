-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. DISTRICTS TABLE
create table public.districts (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    created_at timestamptz default now()
);

-- 2. SCHOOLS TABLE
create table public.schools (
    id uuid primary key default gen_random_uuid(),
    district_id uuid not null references public.districts(id) on delete cascade,
    name text not null,
    created_at timestamptz default now()
);

-- 3. USERS TABLE (Public Profile mapping auth.users)
create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    district_id uuid not null references public.districts(id) on delete restrict,
    school_id uuid references public.schools(id) on delete set null,
    email text unique not null,
    first_name text not null,
    last_name text not null,
    created_at timestamptz default now()
);

-- 4. USER ROLES TABLE
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null unique references public.users(id) on delete cascade,
    role text not null check (role in ('district_admin', 'principal', 'teacher')),
    created_at timestamptz default now()
);

-- 5. CLASSES TABLE
create table public.classes (
    id uuid primary key default gen_random_uuid(),
    school_id uuid not null references public.schools(id) on delete cascade,
    teacher_id uuid not null references public.users(id) on delete restrict,
    name text not null,
    grade_level text not null,
    created_at timestamptz default now()
);

-- 6. STUDENTS TABLE
create table public.students (
    id uuid primary key default gen_random_uuid(),
    school_id uuid not null references public.schools(id) on delete cascade,
    first_name text not null,
    last_name text not null,
    created_at timestamptz default now()
);

-- 7. CLASS ENROLLMENTS TABLE (Join Table)
create table public.class_enrollments (
    id uuid primary key default gen_random_uuid(),
    class_id uuid not null references public.classes(id) on delete cascade,
    student_id uuid not null references public.students(id) on delete cascade,
    enrolled_at timestamptz default now(),
    constraint unique_class_student unique (class_id, student_id)
);

-- ENABLE ROW LEVEL SECURITY (RLS)
alter table public.districts enable row level security;
alter table public.schools enable row level security;
alter table public.users enable row level security;
alter table public.user_roles enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.class_enrollments enable row level security;

-- CREATE RLS SECURITY POLICIES

-- Helper to check active user profile details
-- We define policy helper queries directly inside policies to prevent recursion locks

-- DISTRICTS RLS POLICIES
create policy "Allow user access within their own district" on public.districts
    for select using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
              and users.district_id = districts.id
        )
    );

-- SCHOOLS RLS POLICIES
create policy "Allow district admin to read all schools in their district" on public.schools
    for select using (
        exists (
            select 1 from public.users
            join public.user_roles on user_roles.user_id = users.id
            where users.id = auth.uid()
              and user_roles.role = 'district_admin'
              and users.district_id = schools.district_id
        )
    );

create policy "Allow principals and teachers to read their own assigned school" on public.schools
    for select using (
        exists (
            select 1 from public.users
            where users.id = auth.uid()
              and users.school_id = schools.id
        )
    );

-- USERS (Public profile mapping) POLICIES
create policy "Allow district admins to view all users in their district" on public.users
    for select using (
        exists (
            select 1 from public.users admin
            join public.user_roles on user_roles.user_id = admin.id
            where admin.id = auth.uid()
              and user_roles.role = 'district_admin'
              and admin.district_id = users.district_id
        )
    );

create policy "Allow principals to view all users in their school" on public.users
    for select using (
        exists (
            select 1 from public.users principal
            join public.user_roles on user_roles.user_id = principal.id
            where principal.id = auth.uid()
              and user_roles.role = 'principal'
              and principal.school_id = users.school_id
        )
    );

create policy "Allow users to view their own profile details" on public.users
    for select using ( auth.uid() = id );

-- USER ROLES POLICIES
create policy "Allow users to view their assigned role" on public.user_roles
    for select using (
        user_id = auth.uid() or
        exists (
            select 1 from public.users admin
            join public.user_roles admin_role on admin_role.user_id = admin.id
            where admin.id = auth.uid()
              and admin_role.role = 'district_admin'
              and admin.district_id = (select district_id from public.users u where u.id = user_roles.user_id)
        ) or
        exists (
            select 1 from public.users principal
            join public.user_roles principal_role on principal_role.user_id = principal.id
            where principal.id = auth.uid()
              and principal_role.role = 'principal'
              and principal.school_id = (select school_id from public.users u where u.id = user_roles.user_id)
        )
    );

-- CLASSES POLICIES
create policy "Allow district admin to read all classes in their district" on public.classes
    for select using (
        exists (
            select 1 from public.users admin
            join public.user_roles on user_roles.user_id = admin.id
            join public.schools on schools.id = classes.school_id
            where admin.id = auth.uid()
              and user_roles.role = 'district_admin'
              and admin.district_id = schools.district_id
        )
    );

create policy "Allow principal to read all classes in their school" on public.classes
    for select using (
        exists (
            select 1 from public.users principal
            join public.user_roles on user_roles.user_id = principal.id
            where principal.id = auth.uid()
              and user_roles.role = 'principal'
              and principal.school_id = classes.school_id
        )
    );

create policy "Allow teachers to read their own assigned classes" on public.classes
    for select using ( teacher_id = auth.uid() );

-- STUDENTS POLICIES
create policy "Allow district admin to read all students in their district" on public.students
    for select using (
        exists (
            select 1 from public.users admin
            join public.user_roles on user_roles.user_id = admin.id
            join public.schools on schools.id = students.school_id
            where admin.id = auth.uid()
              and user_roles.role = 'district_admin'
              and admin.district_id = schools.district_id
        )
    );

create policy "Allow principal to read all students in their school" on public.students
    for select using (
        exists (
            select 1 from public.users principal
            join public.user_roles on user_roles.user_id = principal.id
            where principal.id = auth.uid()
              and user_roles.role = 'principal'
              and principal.school_id = students.school_id
        )
    );

create policy "Allow teachers to read students enrolled in their classes" on public.students
    for select using (
        exists (
            select 1 from public.class_enrollments
            join public.classes on classes.id = class_enrollments.class_id
            where classes.teacher_id = auth.uid()
              and class_enrollments.student_id = students.id
        )
    );

-- CLASS ENROLLMENTS POLICIES
create policy "Allow district admin to view all class enrollments in their district" on public.class_enrollments
    for select using (
        exists (
            select 1 from public.users admin
            join public.user_roles on user_roles.user_id = admin.id
            join public.classes on classes.id = class_enrollments.class_id
            join public.schools on schools.id = classes.school_id
            where admin.id = auth.uid()
              and user_roles.role = 'district_admin'
              and admin.district_id = schools.district_id
        )
    );

create policy "Allow principal to view all class enrollments in their school" on public.class_enrollments
    for select using (
        exists (
            select 1 from public.users principal
            join public.user_roles on user_roles.user_id = principal.id
            join public.classes on classes.id = class_enrollments.class_id
            where principal.id = auth.uid()
              and user_roles.role = 'principal'
              and principal.school_id = classes.school_id
        )
    );

create policy "Allow teachers to view enrollments for their classes" on public.class_enrollments
    for select using (
        exists (
            select 1 from public.classes
            where classes.id = class_enrollments.class_id
              and classes.teacher_id = auth.uid()
        )
    );

-- PROFILE AUTO-CLONE TRIGGER
-- Triggers a copy of auth.users signup metadata into public.users profiles automatically.
create or replace function public.handle_new_auth_user()
returns trigger as $$
declare
    v_district_id uuid;
    v_school_id uuid;
    v_role text;
    v_first_name text;
    v_last_name text;
begin
    -- Extract values from user metadata payload (injected during auth sign up)
    v_district_id := (new.raw_user_meta_data->>'district_id')::uuid;
    v_school_id := (new.raw_user_meta_data->>'school_id')::uuid;
    v_role := new.raw_user_meta_data->>'role';
    v_first_name := coalesce(new.raw_user_meta_data->>'first_name', 'Firstname');
    v_last_name := coalesce(new.raw_user_meta_data->>'last_name', 'Lastname');

    -- Insert profile
    insert into public.users (id, district_id, school_id, email, first_name, last_name)
    values (new.id, v_district_id, v_school_id, new.email, v_first_name, v_last_name);

    -- Insert role assignment
    insert into public.user_roles (user_id, role)
    values (new.id, v_role);

    return new;
end;
$$ language plpgsql security definer;

-- Bind handle_new_auth_user to auth.users trigger hook
create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_auth_user();
