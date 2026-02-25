import { Navbar } from '@/components/Navbar'
import { PostList } from '@/components/PostList'
import { Footer } from '@/components/Footer'
import { createClient } from '@/utils/supabase/server'

const ITEMS_PER_PAGE = 4

interface HomeProps {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const supabase = await createClient()

  const activeCategory = params.category || null
  const currentPage = Number(params.page) || 1
  const searchQuery = params.q || null

  // 게시글 조회 (서버 사이드)
  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (activeCategory) {
    query = query.eq('category', activeCategory)
  }

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`)
  }

  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data: posts, count } = await query.range(from, to)

  // 카테고리 목록 조회 (서버 사이드)
  const { data: catData } = await supabase.from('posts').select('category')
  const categories = catData
    ? Array.from(new Set(catData.map(c => c.category)))
    : []

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center">
        <PostList
          posts={posts || []}
          categories={categories}
          activeCategory={activeCategory}
          currentPage={currentPage}
          totalPosts={count || 0}
          itemsPerPage={ITEMS_PER_PAGE}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </>
  )
}
