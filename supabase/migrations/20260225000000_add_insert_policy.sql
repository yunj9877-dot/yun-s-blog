-- =============================================
-- 인증된 사용자의 게시글 작성 허용 (INSERT)
-- =============================================
CREATE POLICY "인증된 사용자는 게시글을 작성할 수 있습니다"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =============================================
-- 인증된 사용자의 게시글 수정 허용 (UPDATE)
-- =============================================
CREATE POLICY "인증된 사용자는 게시글을 수정할 수 있습니다"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- 인증된 사용자의 게시글 삭제 허용 (DELETE)
-- =============================================
CREATE POLICY "인증된 사용자는 게시글을 삭제할 수 있습니다"
  ON public.posts FOR DELETE
  TO authenticated
  USING (true);
