import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createClient } from '@/utils/supabase/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PostActions, FloatingBar, MobileBar } from '@/components/PostActions'
import { ChevronRight, Twitter, Github, Linkedin } from 'lucide-react'

interface PostDetailProps {
    params: Promise<{ id: string }>
}

const getCategoryColor = (category: string) => {
    switch (category?.toUpperCase()) {
        case 'REACT': return 'text-sky-400 bg-sky-400/10 border-sky-400/20'
        case 'DEVOPS': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
        case 'DESIGN': return 'text-pink-400 bg-pink-400/10 border-pink-400/20'
        case 'TYPESCRIPT': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
        case 'BACKEND': return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
        default: return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20'
    }
}

export default async function PostDetailPage({ params }: PostDetailProps) {
    const { id } = await params
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !post) {
        return (
            <>
                <Navbar />
                <main className="flex-1 w-full flex items-center justify-center">
                    <div className="text-center py-32">
                        <h1 className="text-2xl font-bold text-white mb-4">게시글을 찾을 수 없습니다</h1>
                        <p className="text-slate-400 mb-8">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
                        <Link href="/" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                            ← 홈으로 돌아가기
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full relative">
                {/* Floating Interaction Bar (클라이언트) */}
                <FloatingBar />

                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">게시글</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className={`px-2.5 py-0.5 rounded-md border text-xs font-semibold uppercase ${getCategoryColor(post.category)}`}>
                            {post.category}
                        </span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Author & Meta Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-800">
                        <div className="flex items-center gap-4">
                            <Image
                                src={post.author_avatar_url}
                                alt={post.author_name}
                                width={48}
                                height={48}
                                className="rounded-full bg-slate-800 ring-2 ring-slate-700"
                            />
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-white">{post.author_name}</span>
                                    <button className="text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors">
                                        팔로우
                                    </button>
                                </div>
                                <p className="text-sm text-slate-400">
                                    {formattedDate} · {post.read_time}
                                </p>
                            </div>
                        </div>

                        {/* 인터랙션 버튼 (클라이언트) */}
                        <PostActions postId={post.id} postUserId={post.user_id} />
                    </div>

                    {/* Hero Image / Thumbnail */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 ring-1 ring-slate-800">
                        <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 896px) 100vw, 896px"
                            priority
                        />
                    </div>

                    {/* Article Content (서버에서 렌더링됨 → SEO 최적화) */}
                    <div className="prose prose-invert prose-slate max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-white
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-950/20 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
            prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-300 prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl
            prose-img:rounded-xl
            prose-li:text-slate-300
          ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Author Bio Box */}
                    <div className="mt-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Image
                                src={post.author_avatar_url}
                                alt={post.author_name}
                                width={64}
                                height={64}
                                className="rounded-full bg-slate-800 ring-2 ring-slate-700 flex-shrink-0"
                            />
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{post.author_name}</h3>
                                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">작성자</span>
                                </div>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    소프트웨어 엔지니어 | {post.category} 전문가. 최신 기술 트렌드와 실전 개발 경험을 공유합니다.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Interaction Bar (클라이언트) */}
                    <MobileBar />
                </article>
            </main>
            <Footer />
        </>
    )
}
