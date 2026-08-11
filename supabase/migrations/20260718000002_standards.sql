
-- 1. Create Standards Table
create table if not exists public.standards (
    id uuid primary key default gen_random_uuid(),
    code text not null unique,
    subject text not null check (subject in ('Science', 'Mathematics', 'English Language Arts')),
    grade_level text not null,
    description text not null,
    skill_id uuid references public.skills(id) on delete set null,
    created_at timestamptz default now()
);

-- 2. Enable RLS
alter table public.standards enable row level security;
drop policy if exists "Allow read access to standards" on public.standards;
create policy "Allow read access to standards" on public.standards for select using (true);

-- 3. Seed Grade 3 NC Standards
insert into public.standards (code, subject, grade_level, description)
values
-- Mathematics
('NC.3.OA.1', 'Mathematics', '3rd Grade', 'Interpret products of whole numbers (e.g., interpret 5 * 7 as the total number of objects in 5 groups of 7 objects each).'),
('NC.3.OA.2', 'Mathematics', '3rd Grade', 'Interpret whole-number quotients of whole numbers (e.g., interpret 56 / 8 as the number of objects in each share when 56 objects are partitioned equally into 8 shares).'),
('NC.3.OA.3', 'Mathematics', '3rd Grade', 'Use multiplication and division within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities.'),
('NC.3.OA.8', 'Mathematics', '3rd Grade', 'Solve two-step word problems using the four operations. Represent these problems using equations with a letter standing for the unknown quantity.'),
('NC.3.NBT.2', 'Mathematics', '3rd Grade', 'Add and subtract multi-digit whole numbers fluently within 1,000 using strategies and algorithms based on place value.'),
('NC.3.NF.1', 'Mathematics', '3rd Grade', 'Interpret unit fractions (1/b) as the quantity formed by 1 part when a whole is partitioned into b equal parts.'),
('NC.3.NF.2', 'Mathematics', '3rd Grade', 'Interpret a fraction on a number line diagram by defining the interval from 0 to 1 as the whole and partitioning it into equal parts.'),
('NC.3.NF.3', 'Mathematics', '3rd Grade', 'Explain equivalence of fractions and compare fractions by reasoning about their size.'),
('NC.3.MD.1', 'Mathematics', '3rd Grade', 'Tell and write time to the nearest minute. Solve word problems involving addition and subtraction of time intervals in minutes.'),
('NC.3.MD.7', 'Mathematics', '3rd Grade', 'Relate area to the operations of multiplication and addition by tiling and multiplying side lengths.'),
('NC.3.G.1', 'Mathematics', '3rd Grade', 'Reason with shapes and their attributes. Categorize quadrilaterals based on side lengths, angles, and symmetry.'),

-- English Language Arts (ELA)
('NC.3.RL.1', 'English Language Arts', '3rd Grade', 'Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers.'),
('NC.3.RL.2', 'English Language Arts', '3rd Grade', 'Recount stories, including fables, folktales, and myths from diverse cultures; determine the central message, lesson, or moral.'),
('NC.3.RL.3', 'English Language Arts', '3rd Grade', 'Describe characters in a story (e.g., their traits, motivations, or feelings) and explain how their actions contribute to the sequence of events.'),
('NC.3.RI.1', 'English Language Arts', '3rd Grade', 'Ask and answer questions to demonstrate understanding of informational text, referring explicitly to the text as the basis for the answers.'),
('NC.3.RI.2', 'English Language Arts', '3rd Grade', 'Determine the main idea of a text; recount the key details and explain how they support the main idea.'),
('NC.3.RI.3', 'English Language Arts', '3rd Grade', 'Describe the relationship between a series of historical events, scientific ideas or concepts, or steps in technical procedures in a text.'),
('NC.3.W.1', 'English Language Arts', '3rd Grade', 'Write opinion pieces on topics or texts, supporting a point of view with reasons.'),
('NC.3.W.2', 'English Language Arts', '3rd Grade', 'Write informative/explanatory texts to examine a topic and convey ideas and information clearly.'),

-- Science
('NC.3.P.1.1', 'Science', '3rd Grade', 'Infer changes in speed or direction of an object when forces are applied.'),
('NC.3.P.2.1', 'Science', '3rd Grade', 'Compare the properties of soil samples (sand, clay, humus) and their ability to support plant growth.'),
('NC.3.P.3.1', 'Science', '3rd Grade', 'Explain how energy can be transferred from one object to another (conduction, radiation, convection).'),
('NC.3.E.1.1', 'Science', '3rd Grade', 'Recognize that the Earth is part of a system called the solar system.'),
('NC.3.L.1.1', 'Science', '3rd Grade', 'Compare the properties of various ecosystems (land and water) and their ability to support life.'),
('NC.3.L.2.1', 'Science', '3rd Grade', 'Identify the basic structures and functions of plants (roots, stems, leaves, flowers, seeds).')
on conflict (code) do nothing;


-- Map Standards to Skills/Practices
update public.standards set skill_id = 'b1111111-1111-1111-1111-111111111111' where code in ('NC.3.NF.1', 'NC.3.NF.2', 'NC.3.NF.3', 'NC.3.E.1.1', 'NC.3.L.1.1');
update public.standards set skill_id = 'b4444444-4444-4444-4444-444444444444' where code in ('NC.3.OA.1', 'NC.3.OA.2', 'NC.3.OA.3', 'NC.3.OA.8', 'NC.3.NBT.2', 'NC.3.MD.1', 'NC.3.MD.7', 'NC.3.RI.1', 'NC.3.RI.2', 'NC.3.RI.3', 'NC.3.P.1.1', 'NC.3.L.2.1');
update public.standards set skill_id = 'b5555555-5555-5555-5555-555555555555' where code in ('NC.3.G.1', 'NC.3.W.1', 'NC.3.W.2', 'NC.3.P.3.1');
update public.standards set skill_id = 'b6666666-6666-6666-6666-666666666666' where code in ('NC.3.RL.1', 'NC.3.RL.2', 'NC.3.RL.3', 'NC.3.P.2.1');
