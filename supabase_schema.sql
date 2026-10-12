-- =========================================================================
-- SOCH - Vibe Coding: Supabase Database Schema
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. Table: inquiries (Applicant admissions)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  cnic TEXT NOT NULL,
  email TEXT NOT NULL,
  active_whatsapp_number TEXT NOT NULL,
  phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  academic_status TEXT,
  programming_background TEXT,
  referral_code TEXT,
  message TEXT,
  payment_status TEXT DEFAULT 'Unpaid',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
CREATE POLICY "Allow anon insert inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read and manage inquiries" ON public.inquiries;
CREATE POLICY "Allow read and manage inquiries"
  ON public.inquiries FOR ALL
  USING (true)
  WITH CHECK (true);


-- 2. Table: success_stories (Cohort 01 Video Success Stories)
CREATE TABLE IF NOT EXISTS public.success_stories (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  role TEXT DEFAULT 'Cohort 01 Graduate',
  project_description TEXT NOT NULL,
  student_details TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  video_duration TEXT DEFAULT '3:00',
  achievement TEXT DEFAULT '100% Shipped Live Code',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on success_stories" ON public.success_stories;
CREATE POLICY "Allow public read on success_stories"
  ON public.success_stories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow full access on success_stories" ON public.success_stories;
CREATE POLICY "Allow full access on success_stories"
  ON public.success_stories FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed initial Cohort 01 Success Stories
INSERT INTO public.success_stories (
  student_name, role, project_description, student_details, video_url, thumbnail_url, video_duration, achievement, display_order
)
SELECT
  'Muhammad Daniyal',
  'Batch 01 Graduate • Lead Full-Stack Engineer',
  'Built "TaskFlow AI" — real-time project collaboration & automated sprint task breakdown tool.',
  'Before SOCH, I spent hours debugging boilerplate. The Vibe Coding methodology taught me to architect systems with clarity and leverage AI as an exoskeleton. I shipped our MVP in 14 days and landed our first enterprise pilot.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  '3:45',
  'Landed $2.5k/mo Remote Retainer',
  1
WHERE NOT EXISTS (SELECT 1 FROM public.success_stories WHERE student_name = 'Muhammad Daniyal');

INSERT INTO public.success_stories (
  student_name, role, project_description, student_details, video_url, thumbnail_url, video_duration, achievement, display_order
)
SELECT
  'Ayesha Noor',
  'Batch 01 Graduate • Founder of EduVibe PK',
  'Created "EduVibe" — automated curriculum planner for local secondary schools across Khyber Pakhtunkhwa.',
  'SOCH gave me the courage to see that Haripur students can compete globally. The BIC mentorship and AI-accelerated development curriculum allowed me to pitch and win our first incubation grant.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  '4:12',
  'Secured UOH BIC Seed Funding',
  2
WHERE NOT EXISTS (SELECT 1 FROM public.success_stories WHERE student_name = 'Ayesha Noor');

INSERT INTO public.success_stories (
  student_name, role, project_description, student_details, video_url, thumbnail_url, video_duration, achievement, display_order
)
SELECT
  'Bilal Khan',
  'Batch 01 Graduate • Full-Stack AI Builder',
  'Engineered "MediFlow" — clinic appointment, prescription and voice-to-text medical notes assistant.',
  'The emphasis on engineering fundamentals alongside AI is what makes SOCH unique. You understand the architecture deeply, so you steer AI with precision instead of guessing.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  '2:58',
  'Serving 14 clinics across Hazara region',
  3
WHERE NOT EXISTS (SELECT 1 FROM public.success_stories WHERE student_name = 'Bilal Khan');

INSERT INTO public.success_stories (
  student_name, role, project_description, student_details, video_url, thumbnail_url, video_duration, achievement, display_order
)
SELECT
  'Zainab Tariq',
  'Batch 01 Graduate • AI Product Developer',
  'Built "VoiceDesk AI" — Urdu & English bilingual customer phone receptionist for regional businesses.',
  'The hands-on lab at UOH BIC turned abstract AI papers into working, money-making products. In Cohort 01, we deployed code on real servers from week 3.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  '3:20',
  'Contracted by 8 Haripur businesses',
  4
WHERE NOT EXISTS (SELECT 1 FROM public.success_stories WHERE student_name = 'Zainab Tariq');

INSERT INTO public.success_stories (
  student_name, role, project_description, student_details, video_url, thumbnail_url, video_duration, achievement, display_order
)
SELECT
  'Usman Farooq',
  'Batch 01 Graduate • Frontend Systems Engineer',
  'Developed "Hazara Freight Dispatch" — real-time truck tracking and automated invoice generation portal.',
  'Learning to build with next-gen AI workflows boosted my development velocity tenfold. I completed our entire capstone in a single weekend with production tests.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  '4:05',
  'Hired as Lead Frontend Developer',
  5
WHERE NOT EXISTS (SELECT 1 FROM public.success_stories WHERE student_name = 'Usman Farooq');


-- 3. Table: blogs (The Vibe Shift section)
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  blog_heading TEXT NOT NULL,
  blog_details TEXT NOT NULL,
  blog_image TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  published_date TEXT DEFAULT 'May 2026',
  author TEXT DEFAULT 'SOCH Editorial Board',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on blogs" ON public.blogs;
CREATE POLICY "Allow public read on blogs"
  ON public.blogs FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow full access on blogs" ON public.blogs;
CREATE POLICY "Allow full access on blogs"
  ON public.blogs FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed initial Vibe Shift Blogs
INSERT INTO public.blogs (
  blog_heading, blog_details, blog_image, read_time, published_date, author, display_order
)
SELECT
  'How Local Developers are Shaping the Future',
  'Pakistan is no longer just a rising star in the global tech scene; it’s a full-blown supernova, especially when it comes to Artificial Intelligence. From bustling tech hubs in Lahore and Karachi to emerging innovation centers like Haripur, local developers are not just adopting AI—they’re actively shaping its future.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png',
  '5 min read',
  'May 2026',
  'Engr. Adil Khan',
  1
WHERE NOT EXISTS (SELECT 1 FROM public.blogs WHERE blog_heading LIKE '%How Local Developers%');

INSERT INTO public.blogs (
  blog_heading, blog_details, blog_image, read_time, published_date, author, display_order
)
SELECT
  'Navigating Pakistan''s Gig Economy with AI Superpowers',
  'The freelance game has changed, and if you’re not integrating AI, you’re already playing catch-up. Pakistan’s freelance workforce, already the 4th largest globally, is entering a new era: Freelancing 2.0 where prompt directorship and architecture replace manual typing.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/Navigating.png',
  '6 min read',
  'May 2026',
  'Dr. Zeeshan Haider (UOH BIC)',
  2
WHERE NOT EXISTS (SELECT 1 FROM public.blogs WHERE blog_heading LIKE '%Navigating Pakistan%');

INSERT INTO public.blogs (
  blog_heading, blog_details, blog_image, read_time, published_date, author, display_order
)
SELECT
  'Why AI Skills are Non-Negotiable for Pakistani Builders in 2026: A Deep Dive',
  'Let’s be real: the tech landscape of 2026 is vastly different from even a few years ago. For Pakistani coders, having AI skills isn’t a bonus anymore; it’s a fundamental requirement to stay relevant, competitive, and deploy production software at scale.',
  'https://vibeacademy.info/wp-content/uploads/2026/05/Why-AI-Skills-are-Non-Negotiable-for-Pakistani-Builders.png',
  '7 min read',
  'May 2026',
  'SOCH Editorial Board',
  3
WHERE NOT EXISTS (SELECT 1 FROM public.blogs WHERE blog_heading LIKE '%Why AI Skills%');
