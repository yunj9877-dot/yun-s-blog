-- =============================================
-- 시드 데이터: 초기 블로그 게시글
-- =============================================
INSERT INTO public.posts (title, excerpt, content, category, image_url, author_name, author_avatar_url, read_time)
VALUES
  (
    'Next.js 14의 서버 액션: 폼과 데이터 뮤테이션 심층 분석',
    'Next.js 14 애플리케이션에서 서버 액션을 효과적으로 사용하여 폼 제출 및 데이터 뮤테이션을 처리하는 방법을 알아봅니다.',
    '서버 액션은 뮤테이션을 처리하는 혁신적인 방법을 제공합니다...',
    'REACT',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    'Sarah Drasner',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    '8분 소요'
  ),
  (
    '쿠버네티스 vs 도커 스웜: 완벽한 오케스트레이션 도구 선택하기',
    '가장 인기 있는 두 가지 컨테이너 오케스트레이션 플랫폼을 심층적으로 비교합니다. 성능, 사용 편의성 및 엔터프라이즈 환경에서의 준비 상태를 분석합니다.',
    '컨테이너를 오케스트레이션할 때...',
    'DEVOPS',
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
    'Kelsey Hightower',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Kelsey',
    '12분 소요'
  ),
  (
    'CSS 그리드 마스터하기: 복잡한 레이아웃을 쉽게 구축하기',
    '정렬 문제로 그만 고민하세요. CSS 그리드가 프론트엔드 아키텍처를 단순화하고 반응형 디자인을 쉽게 만드는 방법을 알아보세요.',
    'CSS 그리드는 종종 오해받곤 합니다...',
    'DESIGN',
    'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=800&auto=format&fit=crop',
    'Rachel Andrew',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    '6분 소요'
  ),
  (
    '타입스크립트의 미래: 5.5 버전에서 기대할 수 있는 기능',
    '다음 주요 릴리스에서 제공될 타입스크립트의 흥미로운 새로운 기능과 성능 개선 사항을 살펴봅니다.',
    '타입스크립트 5.5는 기대했던 여러 기능들을 도입합니다...',
    'TYPESCRIPT',
    'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
    'Anders Hejlsberg',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Anders',
    '5분 소요'
  ),
  (
    'Node.js와 Express로 확장 가능한 API 구축하기',
    'Node.js 백엔드 서비스의 구조를 잡고 안전하게 보호하며 확장하는 방법에 대한 포괄적인 가이드입니다.',
    'API를 구축할 때 확장성은 가장 중요한 요소여야 합니다...',
    'BACKEND',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    'Ryan Dahl',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
    '10분 소요'
  );
