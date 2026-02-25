-- =============================================
-- posts 테이블에 user_id 컬럼 추가
-- =============================================
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- =============================================
-- 관리자 확인 함수 생성
-- =============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'yunj9877@gmail.com'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- =============================================
-- 기존 RLS 정책 삭제 후 본인+관리자 정책으로 교체
-- =============================================

-- 기존 정책 삭제
DROP POLICY IF EXISTS "인증된 사용자는 게시글을 작성할 수 있습니다" ON public.posts;
DROP POLICY IF EXISTS "인증된 사용자는 게시글을 수정할 수 있습니다" ON public.posts;
DROP POLICY IF EXISTS "인증된 사용자는 게시글을 삭제할 수 있습니다" ON public.posts;

-- INSERT: 인증된 사용자가 글을 작성할 때, user_id가 본인이어야 함
CREATE POLICY "인증된 사용자는 게시글을 작성할 수 있습니다"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 본인 또는 관리자만 수정 가능
CREATE POLICY "본인 또는 관리자만 게시글을 수정할 수 있습니다"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- DELETE: 본인 또는 관리자만 삭제 가능
CREATE POLICY "본인 또는 관리자만 게시글을 삭제할 수 있습니다"
  ON public.posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());
