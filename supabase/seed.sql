-- Seed file for Mosaic Platform Foundation
-- Clear existing data
truncate table public.class_enrollments cascade;
truncate table public.students cascade;
truncate table public.classes cascade;
truncate table public.user_roles cascade;
truncate table public.users cascade;
truncate table public.schools cascade;
truncate table public.districts cascade;
delete from auth.users;

-- 1. INSERT DISTRICT
insert into public.districts (id, name)
values ('d1111111-1111-1111-1111-111111111111', 'Springfield School District');

-- 2. INSERT SCHOOLS
insert into public.schools (id, district_id, name)
values 
('e2222222-2222-2222-2222-222222222222', 'd1111111-1111-1111-1111-111111111111', 'Springfield High School'),
('e3333333-3333-3333-3333-333333333333', 'd1111111-1111-1111-1111-111111111111', 'Shelbyville Elementary');

-- Helper function to generate auth.users rows to trigger profile cloning
-- Note: triggers public.users and public.user_roles creation via trigger
insert into auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
)
values
-- District Admin (1)
(
    'a1000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'admin@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "district_admin", "first_name": "Gary", "last_name": "Superintendent", "district_id": "d1111111-1111-1111-1111-111111111111"}',
    'authenticated',
    'authenticated'
),
-- Principals (3)
(
    'a2000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'principal.skinner@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "principal", "first_name": "Seymour", "last_name": "Skinner", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e2222222-2222-2222-2222-222222222222"}',
    'authenticated',
    'authenticated'
),
(
    'a3000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'principal.chalmers@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "principal", "first_name": "Gary", "last_name": "Chalmers", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e3333333-3333-3333-3333-333333333333"}',
    'authenticated',
    'authenticated'
),
(
    'a4000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'principal.unassigned@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "principal", "first_name": "Unassigned", "last_name": "Principal", "district_id": "d1111111-1111-1111-1111-111111111111"}',
    'authenticated',
    'authenticated'
),
-- Teachers for School A (4)
(
    'e1000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'edna.krabappel@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Edna", "last_name": "Krabappel", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e2222222-2222-2222-2222-222222222222"}',
    'authenticated',
    'authenticated'
),
(
    'e2000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'dewey.largo@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Dewey", "last_name": "Largo", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e2222222-2222-2222-2222-222222222222"}',
    'authenticated',
    'authenticated'
),
(
    'e3000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'brunella.pommelhorst@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Brunella", "last_name": "Pommelhorst", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e2222222-2222-2222-2222-222222222222"}',
    'authenticated',
    'authenticated'
),
(
    'e4000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'audrey.mcconnell@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Audrey", "last_name": "McConnell", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e2222222-2222-2222-2222-222222222222"}',
    'authenticated',
    'authenticated'
),
-- Teachers for School B (4)
(
    'e5000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'elizabeth.hoover@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Elizabeth", "last_name": "Hoover", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e3333333-3333-3333-3333-333333333333"}',
    'authenticated',
    'authenticated'
),
(
    'e6000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'woodrow.gunderson@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Woodrow", "last_name": "Gunderson", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e3333333-3333-3333-3333-333333333333"}',
    'authenticated',
    'authenticated'
),
(
    'e7000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'calliope.jupiter@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Calliope", "last_name": "Jupiter", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e3333333-3333-3333-3333-333333333333"}',
    'authenticated',
    'authenticated'
),
(
    'e8000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'mrs.melrose@springfield.edu',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Clarice", "last_name": "Melrose", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e3333333-3333-3333-3333-333333333333"}',
    'authenticated',
    'authenticated'
);

-- 3. INSERT CLASSES (6 Classes)
insert into public.classes (id, school_id, teacher_id, name, grade_level)
values
-- Springfield High (3 classes)
('c0000001-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'e1000000-0000-0000-0000-000000000000', '4th Grade English', 'Grade 4'),
('c0000002-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'e2000000-0000-0000-0000-000000000000', 'High School Band', 'Grade 9'),
('c0000003-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'e3000000-0000-0000-0000-000000000000', 'Gymnastics & PE', 'Grade 10'),
-- Shelbyville Elementary (3 classes)
('c0000004-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'e5000000-0000-0000-0000-000000000000', '2nd Grade Homeroom', 'Grade 2'),
('c0000005-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'e6000000-0000-0000-0000-000000000000', 'Elementary Math', 'Grade 3'),
('c0000006-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'e7000000-0000-0000-0000-000000000000', 'Science & Astronomy', 'Grade 5');

-- 4. INSERT STUDENTS (30 Students)
insert into public.students (id, school_id, first_name, last_name)
values
-- School A: Springfield High Students (15 students)
('a000001-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Bart', 'Simpson'),
('a000002-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Lisa', 'Simpson'),
('a000003-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Milhouse', 'Van Houten'),
('a000004-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Nelson', 'Muntz'),
('a000005-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Martin', 'Prince'),
('a000006-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Sherri', 'Mackleberry'),
('a000007-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Terri', 'Mackleberry'),
('a000008-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Ralph', 'Wiggum'),
('a000009-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Janey', 'Powell'),
('a000010-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Wendell', 'Borton'),
('a000011-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Lewis', 'Clark'),
('a000012-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Richard', 'Richard'),
('a000013-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Database', 'Error-Student'),
('a000014-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Kearney', 'Zzyzwicz'),
('a000015-0000-0000-0000-000000000000', 'e2222222-2222-2222-2222-222222222222', 'Jimbo', 'Jones'),
-- School B: Shelbyville Elementary Students (15 students)
('a000016-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Shelby', 'Shelbyville'),
('a000017-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Milhouse-B', 'Shelbyville'),
('a000018-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Database-B', 'Shelbyville'),
('a000019-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Bart-B', 'Shelbyville'),
('a000020-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Todd', 'Flanders'),
('a000021-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Rod', 'Flanders'),
('a000022-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Lisa-B', 'Shelbyville'),
('a000023-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Allison', 'Taylor'),
('a000024-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Alex', 'Whitney'),
('a000025-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Uter', 'Zorker'),
('a000026-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Jessica', 'Lovejoy'),
('a000027-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Colin', 'Environment-Kid'),
('a000028-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Laura', 'Powers'),
('a000029-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Gina', 'Vendetti'),
('a000030-0000-0000-0000-000000000000', 'e3333333-3333-3333-3333-333333333333', 'Donny', 'Snitch-Kid');

-- 5. ENROLL STUDENTS IN CLASSES (5 students per class)
insert into public.class_enrollments (class_id, student_id)
values
-- Springfield High - Class 1 (4th Grade English, Teacher Edna)
('c0000001-0000-0000-0000-000000000000', 'a000001-0000-0000-0000-000000000000'),
('c0000001-0000-0000-0000-000000000000', 'a000002-0000-0000-0000-000000000000'),
('c0000001-0000-0000-0000-000000000000', 'a000003-0000-0000-0000-000000000000'),
('c0000001-0000-0000-0000-000000000000', 'a000004-0000-0000-0000-000000000000'),
('c0000001-0000-0000-0000-000000000000', 'a000005-0000-0000-0000-000000000000'),

-- Springfield High - Class 2 (High School Band, Teacher Dewey Largo)
('c0000002-0000-0000-0000-000000000000', 'a000006-0000-0000-0000-000000000000'),
('c0000002-0000-0000-0000-000000000000', 'a000007-0000-0000-0000-000000000000'),
('c0000002-0000-0000-0000-000000000000', 'a000008-0000-0000-0000-000000000000'),
('c0000002-0000-0000-0000-000000000000', 'a000009-0000-0000-0000-000000000000'),
('c0000002-0000-0000-0000-000000000000', 'a000010-0000-0000-0000-000000000000'),

-- Springfield High - Class 3 (Gymnastics & PE, Teacher Brunella Pommelhorst)
('c0000003-0000-0000-0000-000000000000', 'a000011-0000-0000-0000-000000000000'),
('c0000003-0000-0000-0000-000000000000', 'a000012-0000-0000-0000-000000000000'),
('c0000003-0000-0000-0000-000000000000', 'a000013-0000-0000-0000-000000000000'),
('c0000003-0000-0000-0000-000000000000', 'a000014-0000-0000-0000-000000000000'),
('c0000003-0000-0000-0000-000000000000', 'a000015-0000-0000-0000-000000000000'),

-- Shelbyville Elementary - Class 4 (2nd Grade Homeroom, Teacher Elizabeth Hoover)
('c0000004-0000-0000-0000-000000000000', 'a000016-0000-0000-0000-000000000000'),
('c0000004-0000-0000-0000-000000000000', 'a000017-0000-0000-0000-000000000000'),
('c0000004-0000-0000-0000-000000000000', 'a000018-0000-0000-0000-000000000000'),
('c0000004-0000-0000-0000-000000000000', 'a000019-0000-0000-0000-000000000000'),
('c0000004-0000-0000-0000-000000000000', 'a000020-0000-0000-0000-000000000000'),

-- Shelbyville Elementary - Class 5 (Elementary Math, Teacher Woodrow Gunderson)
('c0000005-0000-0000-0000-000000000000', 'a000021-0000-0000-0000-000000000000'),
('c0000005-0000-0000-0000-000000000000', 'a000022-0000-0000-0000-000000000000'),
('c0000005-0000-0000-0000-000000000000', 'a000023-0000-0000-0000-000000000000'),
('c0000005-0000-0000-0000-000000000000', 'a000024-0000-0000-0000-000000000000'),
('c0000005-0000-0000-0000-000000000000', 'a000025-0000-0000-0000-000000000000'),

-- Shelbyville Elementary - Class 6 (Science & Astronomy, Teacher Calliope Jupiter)
('c0000006-0000-0000-0000-000000000000', 'a000026-0000-0000-0000-000000000000'),
('c0000006-0000-0000-0000-000000000000', 'a000027-0000-0000-0000-000000000000'),
('c0000006-0000-0000-0000-000000000000', 'a000028-0000-0000-0000-000000000000'),
('c0000006-0000-0000-0000-000000000000', 'a000029-0000-0000-0000-000000000000'),
('c0000006-0000-0000-0000-000000000000', 'a000030-0000-0000-0000-000000000000');

-- 6. INSERT SKILLS COMPETENCIES
insert into public.skills (id, name, description)
values
('b4444444-4444-4444-4444-444444444444', 'Critical Thinking', 'Ability to analyze information objectively, evaluate evidence, and synthesize arguments.'),
('b5555555-5555-5555-5555-555555555555', 'Creative Design', 'Generating original ideas, prototyping solutions, and iterating based on design constraints.'),
('b6666666-6666-6666-6666-666666666666', 'Reflective Practice', 'Self-assessing performance, setting goals, and developing growth mindsets from feedback.'),

('b1111111-1111-1111-1111-111111111111', 'Systems Thinking', 'Ability to analyze cause-and-effect relationships and connections inside a complex system.'),
('b2222222-2222-2222-2222-222222222222', 'Collaboration', 'Negotiation, role distribution, and group alignment during collaborative experiments.'),
('b3333333-3333-3333-3333-333333333333', 'Agency', 'Student-initated inquiry, wait-time navigation, and proactive discovery without prompt.');

-- 7. INSERT STUDENT SKILLS EVIDENCE LOGS
insert into public.student_skills (student_id, skill_id, evaluated_by, score, evidence, created_at)
values
-- Bart Simpson (Systems Thinking) - low score first
('a000001-0000-0000-0000-000000000000', 'b1111111-1111-1111-1111-111111111111', 'e1000000-0000-0000-0000-000000000000', 1, 'Bart struggled to connect soil compaction to tree root health during the first classroom walkthrough.', now() - interval '2 days'),
-- Bart Simpson (Systems Thinking) - higher score later
('a000001-0000-0000-0000-000000000000', 'b1111111-1111-1111-1111-111111111111', 'e1000000-0000-0000-0000-000000000000', 2, 'Bart showed improvement, successfully connecting shade levels to the persistent dampness of soil near the fence.', now() - interval '1 day'),
-- Lisa Simpson (Systems Thinking) - Proficient/Advanced
('a000002-0000-0000-0000-000000000000', 'b1111111-1111-1111-1111-111111111111', 'e1000000-0000-0000-0000-000000000000', 4, 'Lisa mapped a complex 8-node causal system drawing links between wind, tree branches, moisture, and mushroom growth.', now() - interval '2 days'),
-- Lisa Simpson (Agency) - Advanced
('a000002-0000-0000-0000-000000000000', 'b3333333-3333-3333-3333-333333333333', 'e1000000-0000-0000-0000-000000000000', 4, 'Lisa initiated the team journal entries and coordinated the sketch board role division with Bart and Milhouse.', now() - interval '1 day');

-- 8. INSERT CUSTOM USER FOR TESTING
insert into auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
)
values (
    'e5555555-5555-5555-5555-555555555555',
    '00000000-0000-0000-0000-000000000000',
    'semihagnyldz@gmail.com',
    '$2b$10$7gGfq0J3ICBRkBv14UoxbeP9QXIHSa62zEe1rqDUaxTNuXvlmZWAW',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "teacher", "first_name": "Semih", "last_name": "Yildiz", "district_id": "d1111111-1111-1111-1111-111111111111", "school_id": "e2222222-2222-2222-2222-222222222222"}',
    'authenticated',
    'authenticated'
) on conflict do nothing;

-- Assign Semih to teach the 4th Grade English class
update public.classes
set teacher_id = 'e5555555-5555-5555-5555-555555555555'
where id = 'c0000001-0000-0000-0000-000000000000';



-- PLC Seed Data
insert into public.plc_teams (id, school_id, name)
values ('ea111111-1111-1111-1111-111111111111', 'e2222222-2222-2222-2222-222222222222', 'Grade 3 ELA PLC')
on conflict do nothing;

insert into public.plc_team_members (team_id, user_id, is_leader)
values 
('ea111111-1111-1111-1111-111111111111', 'bbc0c6dc-a619-4d07-a5c1-8ae49e0e0204', true),
('ea111111-1111-1111-1111-111111111111', 'a2000000-0000-0000-0000-000000000000', false)
on conflict do nothing;

insert into public.plc_meetings (id, team_id, date, facilitator_id, objective, standard, learning_target, success_criteria, status)
values (
  'eb222222-2222-2222-2222-222222222222',
  'ea111111-1111-1111-1111-111111111111',
  now(),
  'bbc0c6dc-a619-4d07-a5c1-8ae49e0e0204',
  'Analyze exit tickets to identify students struggling with text evidence cause-effect loops.',
  'NC.3.RL.1',
  'Students can identify cause-effect linkages in fables using explicit text evidence.',
  'Students can summarize at least two cause-effect loops using a structured graphic organizer.',
  'draft'
)
on conflict do nothing;



-- Responsive Instruction Seed Data
insert into public.responsive_cycles (id, teacher_id, subject, grade_level, standard, lesson_unit, learning_target, success_criteria, status)
values ('ea333333-3333-3333-3333-333333333333', 'bbc0c6dc-a619-4d07-a5c1-8ae49e0e0204', 'Mathematics', '3rd Grade', 'NC.3.NF.2', 'Fractions Unit 2', 'Represent fractions on a number line', 'Students can partition a number line into thirds and place 2/3 correctly', 'active')
on conflict do nothing;

insert into public.responsive_evidence (id, cycle_id, student_id, class_id, evidence_type, notes, collected_date)
values 
('eb333333-3333-3333-3333-333333333331', 'ea333333-3333-3333-3333-333333333333', 'a0000001-0000-0000-0000-000000000000', 'c0000001-0000-0000-0000-000000000000', 'exit_ticket', 'Bart placed 2/3 at 1/3 point. Confuses partitioning counts with tick mark counts.', now() - interval '2 days'),
('eb333333-3333-3333-3333-333333333332', 'ea333333-3333-3333-3333-333333333333', 'a0000002-0000-0000-0000-000000000000', 'c0000001-0000-0000-0000-000000000000', 'exit_ticket', 'Lisa accurately placed 2/3 and drew custom extension partitioning.', now() - interval '2 days')
on conflict do nothing;

insert into public.responsive_student_groups (id, cycle_id, name, notes)
values 
('ec333333-3333-3333-3333-333333333331', 'ea333333-3333-3333-3333-333333333333', 'Fraction Partitioning', 'Needs concrete visual scaffolds for partitions'),
('ec333333-3333-3333-3333-333333333332', 'ea333333-3333-3333-3333-333333333333', 'Extension Challenge', 'Advanced enrichment pathway')
on conflict do nothing;

insert into public.responsive_group_members (group_id, student_id, performance_level)
values 
('ec333333-3333-3333-3333-333333333331', 'a0000001-0000-0000-0000-000000000000', 'Developing'),
('ec333333-3333-3333-3333-333333333332', 'a0000002-0000-0000-0000-000000000000', 'Advanced')
on conflict do nothing;

insert into public.responsive_strategies (group_id, strategy_name, responsible_teacher_id, start_date, followup_date, evidence_to_collect, status, notes)
values 
('ec333333-3333-3333-3333-333333333331', 'Manipulatives & Number Line Tiles', 'bbc0c6dc-a619-4d07-a5c1-8ae49e0e0204', now(), now() + interval '5 days', 'Classroom observation during fraction building', 'In Progress', 'Assign physical fraction tiles to build intervals'),
('ec333333-3333-3333-3333-333333333332', 'Project-based independent inquiry', 'bbc0c6dc-a619-4d07-a5c1-8ae49e0e0204', now(), now() + interval '5 days', 'Self-designed inquiry project rubric', 'In Progress', 'Inquiry into historical Sumerian fraction representations')
on conflict do nothing;
