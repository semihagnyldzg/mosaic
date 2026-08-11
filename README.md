# Mosaic - School Intelligence Platform Foundation

Mosaic is a multi-school web application that connects curriculum, instruction, professional development, and student evidence in one intelligent workspace.

This repository contains the foundation project of Mosaic: **secure authentication, district/school organization routing, dynamic role-based dashboards, and Row Level Security (RLS) policies.**

---

## Technical Stack
- **Framework:** Next.js (App Router, Tailwind CSS, TypeScript)
- **Database / Auth:** Supabase (PostgreSQL with RLS, triggers, session tokens)

---

## Database Schema Diagram

We define a 7-tier relational model using PostgreSQL in Supabase:

```
  [districts]
      |
      |-- [schools]
      |      |
      |      |-- [classes] <----
      |      |      |           | (class_enrollments)
      |      |      +-----------+
      |      |                  |
      |      |-- [students] <---+
      |
      +-- [users] (Public Profiles -> auth.users)
             |
             +-- [user_roles] (district_admin, principal, teacher)
```

### Tables Definition
1. **`districts`**: School districts.
2. **`schools`**: Specific schools located inside a district.
3. **`users`**: Profiles linked directly to Supabase Auth (`auth.users`).
4. **`user_roles`**: Map profiles to permissions: `district_admin`, `principal`, or `teacher`.
5. **`classes`**: Classroom learning groups taught by a teacher.
6. **`students`**: Students enrolled in a school.
7. **`class_enrollments`**: Maps student enrollments to classrooms.

---

## Supabase Database Setup

To apply the database structures and mock data locally:

1. **Schema Migrations:**
   Copy the contents of `supabase/migrations/20260717000000_init.sql` and run it in the **Supabase SQL Editor** (or run `supabase migration up` if using Supabase CLI).
   *This sets up tables, constraints, public triggers, and Row Level Security (RLS) policies.*

2. **Seeding Demo Data:**
   Copy the contents of `supabase/seed.sql` and execute it in your SQL Editor.
   *This seeds 1 district, 2 schools, 3 principals, 8 teachers, 6 classes, and 30 student rosters.*

---

## Row Level Security (RLS) Verification

RLS is strictly enforced at the Postgres layer using `auth.uid()` to prevent data leakage:
- **District Admin** can read all schools, teachers, classes, and students in their assigned district.
- **Principal** can read only data associated with their own school (other schools are blocked).
- **Teacher** can read only classes they teach, and student rosters enrolled in their classes.
- No user can access any record belonging to another district.

---

## Local Development Run

To launch the Next.js frontend:

1. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Demo Login Credentials

Use the following seeded accounts to test authentication, middleware routing, and RLS data scopes. All accounts use the password **`password123`**.

### 1. District Admin Profile
- **Email:** `admin@springfield.edu`
- **Role:** District Admin (Springfield District)
- **Scope:** View Springfield High and Shelbyville Elementary, all classrooms, and student aggregates.

### 2. School Principal Profiles
- **Email:** `principal.skinner@springfield.edu`
- **Role:** Principal (Springfield High School)
- **Scope:** View 4 teachers, 3 classes, and 15 students at Springfield High. Shelbyville Elementary data is completely hidden.
- **Email:** `principal.chalmers@springfield.edu`
- **Role:** Principal (Shelbyville Elementary)
- **Scope:** View 4 teachers, 3 classes, and 15 students at Shelbyville. Springfield High is hidden.

### 3. Teacher Profiles
- **Email:** `edna.krabappel@springfield.edu`
- **Role:** Teacher (Springfield High School)
- **Scope:** View only the assigned class "4th Grade English" and its 5 enrolled students (Bart, Lisa, Milhouse, Nelson, Martin). All other classes/students are hidden.
- **Email:** `elizabeth.hoover@springfield.edu`
- **Role:** Teacher (Shelbyville Elementary)
- **Scope:** View only the assigned class "2nd Grade Homeroom" and its 5 enrolled students.
