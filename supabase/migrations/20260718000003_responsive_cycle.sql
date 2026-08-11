
-- Drop tables if exist
drop table if exists public.responsive_progress_checks cascade;
drop table if exists public.responsive_student_paths cascade;
drop table if exists public.responsive_strategies_library cascade;

-- 1. Create Strategies Library
create table public.responsive_strategies_library (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text not null,
    intended_learning_need text not null,
    subject text not null check (subject in ('Science', 'Mathematics', 'English Language Arts')),
    grade_band text not null,
    materials_needed text not null,
    suggested_duration text not null,
    implementation_steps text not null,
    evidence_to_collect text not null,
    when_to_use text not null,
    when_not_to_use text not null,
    research_source text,
    approval_status text not null check (approval_status in ('District Approved', 'School Approved', 'Teacher Created', 'Research Source Available', 'Source Pending Review')),
    created_at timestamptz default now()
);

-- 2. Create Student Learning Paths
create table public.responsive_student_paths (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.students(id) on delete cascade,
    cycle_id uuid not null references public.responsive_cycles(id) on delete cascade,
    current_need text not null,
    current_proficiency_level text not null,
    current_group_id uuid references public.responsive_student_groups(id) on delete set null,
    current_strategy_id uuid references public.responsive_strategies(id) on delete set null,
    curriculum_status text not null check (curriculum_status in ('Participating in Core Instruction', 'Core Instruction with Additional Support', 'Temporary Small-Group Support', 'Reteaching', 'Extension', 'Independent Inquiry')),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(student_id, cycle_id)
);

-- 3. Create Progress Checks
create table public.responsive_progress_checks (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.students(id) on delete cascade,
    cycle_id uuid not null references public.responsive_cycles(id) on delete cascade,
    check_date timestamptz not null default now(),
    evidence_collected text not null,
    progress_rating text not null check (progress_rating in ('No Evidence Yet', 'Limited Progress', 'Making Progress', 'Met the Learning Target', 'Exceeded the Learning Target')),
    strategy_working boolean not null,
    need_remains boolean not null,
    next_decision text not null check (next_decision in ('Continue the current strategy', 'Adjust the current strategy', 'Move the student to a different learning-need group', 'Return the student to core instruction', 'Provide additional support', 'Begin a new learning target', 'Move the student to enrichment or extension', 'Close the current learning path')),
    reflection_worked text not null,
    reflection_not_worked text not null,
    reflection_reveal text not null,
    reflection_change text not null,
    share_with_plc boolean not null default false,
    created_at timestamptz default now()
);

-- 4. Enable RLS
alter table public.responsive_strategies_library enable row level security;
alter table public.responsive_student_paths enable row level security;
alter table public.responsive_progress_checks enable row level security;

create policy "Read strategies library" on public.responsive_strategies_library for select using (true);
create policy "Insert strategies library" on public.responsive_strategies_library for insert with check (true);

create policy "All access for student paths" on public.responsive_student_paths for all using (true);
create policy "All access for progress checks" on public.responsive_progress_checks for all using (true);

-- 5. Seed Strategy Library
insert into public.responsive_strategies_library (name, description, intended_learning_need, subject, grade_band, materials_needed, suggested_duration, implementation_steps, evidence_to_collect, when_to_use, when_not_to_use, research_source, approval_status)
values
(
  'Manipulatives & Number Line Tiles',
  'Using physical or digital fraction tiles to partition space and visually locate fraction intervals.',
  'Fraction Partitioning',
  'Mathematics',
  'Grade 3-5',
  'Physical fraction circles, line bars, or digital fraction simulators.',
  '15-20 minutes daily',
  '1. Introduce unit fractions using bars. 2. Guide students to align bars along a number line. 3. Have students draw tick marks matching the boundaries.',
  'Classroom observation checklists during student interval builds.',
  'When students place fractions based on tick marks rather than intervals.',
  'When students have already mastered interval division and are ready for abstract symbols.',
  'Hattie, J. (2012). Visible learning for teachers.',
  'District Approved'
),
(
  'Claim-Evidence-Reasoning (CER)',
  'A structured writing frame that guides students to state a scientific claim, support it with empirical evidence, and provide justification linking the evidence to the claim.',
  'Scientific Reasoning',
  'Science',
  'Grade 3-5',
  'CER worksheets, data charts, ecosystems science text.',
  '20-30 minutes per activity',
  '1. Pose a scientific question. 2. Have students write their claim. 3. List data points as evidence. 4. Guide students to write reasoning sentences explaining why the evidence supports the claim.',
  'CER writing samples and rubric scores.',
  'When students write claims without supporting details or reasons.',
  'When students do not yet have active experimental data to analyze.',
  'McNeill, K. L. & Krajcik, J. S. (2011). Supporting scientific explanations.',
  'District Approved'
),
(
  'Close Reading & Annotation',
  'Guiding students to read a short complex passage multiple times, marking text details (questions, key terms, linkages) to build vocabulary and understanding.',
  'Reading Comprehension',
  'English Language Arts',
  'Grade 3-5',
  'Passage printouts, colored highlighters, pencils.',
  '15-25 minutes per session',
  '1. First reading for general understanding. 2. Second reading to circle unfamiliar words and underline key ideas. 3. Third reading to write margin notes answering comprehension prompts.',
  'Comprehension questions and margin annotations analysis.',
  'When students read passages quickly and struggle with text-connection questions.',
  'When students do not yet decode words fluently enough to comprehend the passage.',
  'Fisher, D. & Frey, N. (2012). Close reading in elementary schools.',
  'District Approved'
);
