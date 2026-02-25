-- =============================================
-- posts 테이블 생성
-- =============================================
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  author_name text NOT NULL,
  author_avatar_url text NOT NULL,
  read_time text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================
-- RLS (Row Level Security) 활성화
-- =============================================
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "누구나 게시글을 조회할 수 있습니다"
  ON public.posts FOR SELECT
  USING (true);
