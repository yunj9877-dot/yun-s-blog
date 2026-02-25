import Link from 'next/link'
import { BlogCard } from './BlogCard'

interface Post {
    id: string
    title: string
    excerpt: string
    content: string
    category: string
    image_url: string
    author_name: string
    author_avatar_url: string
    read_time: string
    created_at: string
}

interface PostListProps {
    posts: Post[]
    categories: string[]
    activeCategory: string | null
    currentPage: number
    totalPosts: number
    itemsPerPage: number
    searchQuery: string | null
}

export function PostList({ posts, categories, activeCategory, currentPage, totalPosts, itemsPerPage, searchQuery }: PostListProps) {
    const totalPages = Math.ceil(totalPosts / itemsPerPage)

    const buildUrl = (params: { category?: string | null; page?: number }) => {
        const searchParams = new URLSearchParams()
        const cat = params.category !== undefined ? params.category : activeCategory
        const pg = params.page !== undefined ? params.page : currentPage

        if (cat) searchParams.set('category', cat)
        if (pg > 1) searchParams.set('page', String(pg))

        const qs = searchParams.toString()
        return qs ? `/?${qs}` : '/'
    }

    return (
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex-1">
                <div className="mb-12">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 mt-12 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        엔지니어링 인사이트
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                        현대 소프트웨어 개발을 위한 기술 심층 분석, 아키텍처 패턴 및 실전 팁을 공유합니다.
                    </p>
                </div>

                {searchQuery && (
                    <div className="mb-8 flex items-center gap-3">
                        <p className="text-slate-400">
                            <span className="text-white font-semibold">&quot;{searchQuery}&quot;</span> 검색 결과: {totalPosts}건
                        </p>
                        <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            ✕ 초기화
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/20 border border-slate-800 rounded-2xl">
                        <p className="text-slate-400 text-lg">해당 카테고리의 글이 없습니다.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center gap-2">
                        {currentPage > 1 ? (
                            <Link
                                href={buildUrl({ page: currentPage - 1 })}
                                className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                이전
                            </Link>
                        ) : (
                            <span className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 opacity-50">
                                이전
                            </span>
                        )}
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <Link
                                    key={p}
                                    href={buildUrl({ page: p })}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${currentPage === p
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
                                        }`}
                                >
                                    {p}
                                </Link>
                            ))}
                        </div>
                        {currentPage < totalPages ? (
                            <Link
                                href={buildUrl({ page: currentPage + 1 })}
                                className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                다음
                            </Link>
                        ) : (
                            <span className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 opacity-50">
                                다음
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-8 mt-12 lg:mt-32">
                {/* 인기 태그 - 서버 렌더링 */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        인기 태그
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/"
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${activeCategory === null
                                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                                : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            # 전체 글
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={buildUrl({ category, page: 1 })}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${activeCategory === category
                                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                                    : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                # {category}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
