-- =============================================
-- Supabase Storage: 이미지 업로드용 버킷 생성
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- 누구나 이미지 조회 가능
CREATE POLICY "누구나 이미지를 조회할 수 있습니다"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

-- 인증된 사용자만 이미지 업로드 가능
CREATE POLICY "인증된 사용자는 이미지를 업로드할 수 있습니다"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'post-images');

-- 인증된 사용자만 이미지 삭제 가능
CREATE POLICY "인증된 사용자는 이미지를 삭제할 수 있습니다"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'post-images');
