'use client'

import { useState, useCallback, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createClient } from '@/utils/supabase/client'
import { Navbar } from '@/components/Navbar'
import {
    LayoutGrid, Bold, Italic, Code, Link2, ImageIcon,
    List, Settings, Rocket, Save, Eye, PenLine,
    Hash, Upload, Loader2
} from 'lucide-react'

const CATEGORIES = ['REACT', 'DEVOPS', 'DESIGN', 'TYPESCRIPT', 'BACKEND']

const DEFAULT_CONTENT = `# 제목을 입력하세요

여기에 블로그 글을 작성하세요. **마크다운** 문법을 지원합니다.

## 부제목

일반 텍스트를 작성하고 *기울임꼴*이나 **굵은 글씨**를 사용할 수 있습니다.

### 목록 예시

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

> 인용구는 이렇게 작성합니다.

\`\`\`javascript
// 코드 블록도 지원합니다
const greeting = "안녕하세요!";
console.log(greeting);
\`\`\`
`

function WritePageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editId = searchParams.get('id')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const coverInputRef = useRef<HTMLInputElement>(null)
    const [content, setContent] = useState(DEFAULT_CONTENT)
    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [category, setCategory] = useState('REACT')
    const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop')
    const [publishing, setPublishing] = useState(false)
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
    const [showSettings, setShowSettings] = useState(false)
    const [saved, setSaved] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    const supabase = createClient()

    // 통계 계산
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length
    const lineCount = content.split('\n').length

    // 마크다운 삽입 헬퍼
    const insertMarkdown = useCallback((prefix: string, suffix: string = '') => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selectedText = content.substring(start, end)
        const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end)
        setContent(newText)

        // 커서 위치 조정
        setTimeout(() => {
            textarea.focus()
            const newCursorPos = start + prefix.length + selectedText.length + suffix.length
            textarea.setSelectionRange(newCursorPos, newCursorPos)
        }, 0)
    }, [content])

    // 이미지 업로드 함수
    const uploadImage = useCallback(async (file: File, isCover: boolean = false) => {
        setUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `uploads/${fileName}`

            const { error } = await supabase.storage
                .from('post-images')
                .upload(filePath, file)

            if (error) throw error

            const { data: { publicUrl } } = supabase.storage
                .from('post-images')
                .getPublicUrl(filePath)

            if (isCover) {
                setImageUrl(publicUrl)
            } else {
                insertMarkdown(`![${file.name}](${publicUrl})`, '')
            }
        } catch (error) {
            console.error('이미지 업로드 오류:', error)
            alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setUploading(false)
        }
    }, [supabase, insertMarkdown])

    // 파일 선택 핸들러 (본문 이미지)
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) uploadImage(file, false)
        e.target.value = ''
    }, [uploadImage])

    // 파일 선택 핸들러 (커버 이미지)
    const handleCoverSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) uploadImage(file, true)
        e.target.value = ''
    }, [uploadImage])

    // 로그인 체크 + 수정 모드 시 기존 글 불러오기
    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/login')
                return
            }
            setAuthChecked(true)

            // 수정 모드: 기존 게시글 데이터 불러오기
            if (editId) {
                const { data: post } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', editId)
                    .single()

                if (post) {
                    setTitle(post.title)
                    setContent(post.content)
                    setExcerpt(post.excerpt)
                    setCategory(post.category)
                    setImageUrl(post.image_url)
                    setIsEditMode(true)
                    setShowSettings(true) // 수정 모드: 설정 패널 자동 오픈 (커버 이미지 변경 가능)
                }
            }
        }
        init()
    }, [editId])

    // 인증 확인 전 로딩 표시
    if (!authChecked) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-slate-400 text-sm">로딩 중...</div>
            </div>
        )
    }

    const toolbarActions = [
        { icon: Bold, label: '굵게', action: () => insertMarkdown('**', '**') },
        { icon: Italic, label: '기울임', action: () => insertMarkdown('*', '*') },
        { icon: Code, label: '코드', action: () => insertMarkdown('`', '`') },
        { icon: Link2, label: '링크', action: () => insertMarkdown('[', '](url)') },
        { icon: ImageIcon, label: '이미지 업로드', action: () => fileInputRef.current?.click() },
        { icon: List, label: '리스트', action: () => insertMarkdown('- ', '') },
        { icon: Hash, label: '제목', action: () => insertMarkdown('## ', '') },
    ]

    // 발행/수정 기능
    const handlePublish = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.')
            return
        }

        setPublishing(true)
        try {
            const { data: { session } } = await supabase.auth.getSession()

            const postData = {
                title: title.trim(),
                excerpt: excerpt.trim() || content.substring(0, 150).replace(/[#*`\[\]]/g, '').trim(),
                content: content,
                category: category,
                image_url: imageUrl || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
                author_name: session?.user?.email?.split('@')[0] || '익명',
                author_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.email || 'anonymous'}`,
                read_time: `${Math.max(1, Math.ceil(wordCount / 200))}분 소요`,
            }

            let error

            if (isEditMode && editId) {
                // 수정 모드: UPDATE
                const result = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', editId)
                error = result.error
            } else {
                // 새 글 모드: INSERT
                const result = await supabase
                    .from('posts')
                    .insert({ ...postData, user_id: session?.user?.id })
                error = result.error
            }

            if (error) throw error

            router.push(isEditMode ? `/posts/${editId}` : '/')
        } catch (error) {
            console.error('발행 오류:', error)
            alert('게시글 발행에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setPublishing(false)
        }
    }

    // 줄 번호 생성
    const lineNumbers = content.split('\n').map((_, i) => i + 1)

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* 에디터 헤더 */}
            <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-full mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        {/* 좌측: 로고 + 제목 */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                                <div className="bg-blue-600 p-1 rounded-lg">
                                    <LayoutGrid className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-bold text-white hidden sm:block">DevPublish</span>
                            </Link>
                            <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요..."
                                className="flex-1 bg-transparent text-white text-sm font-medium placeholder-slate-500 focus:outline-none min-w-0 truncate"
                            />
                        </div>

                        {/* 우측: 상태 + 버튼 */}
                        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                            {saved && (
                                <span className="text-xs text-slate-500 hidden sm:block">저장됨</span>
                            )}

                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                title="설정"
                            >
                                <Settings className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handlePublish}
                                disabled={publishing || !title.trim()}
                                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <Rocket className="w-4 h-4" />
                                {publishing ? (isEditMode ? '수정 중...' : '발행 중...') : (isEditMode ? '수정' : '발행')}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 설정 패널 (슬라이드) */}
            {showSettings && (
                <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                        <div className={`grid grid-cols-1 ${isEditMode ? '' : 'sm:grid-cols-3'} gap-4`}>
                            {!isEditMode && (
                                <>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">카테고리</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">요약</label>
                                        <input
                                            type="text"
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            placeholder="게시글 요약을 입력하세요..."
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">커버 이미지</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => coverInputRef.current?.click()}
                                        disabled={uploading}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
                                    >
                                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        업로드
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 숨겨진 파일 입력 */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
            <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverSelect}
                className="hidden"
            />

            {/* 업로드 중 표시 */}
            {uploading && (
                <div className="bg-blue-600/20 border-b border-blue-500/30 px-4 py-2">
                    <div className="flex items-center gap-2 text-sm text-blue-400 max-w-4xl mx-auto">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        이미지 업로드 중...
                    </div>
                </div>
            )}

            {/* 에디터 툴바 */}
            <div className="border-b border-slate-800 bg-slate-950">
                <div className="max-w-full mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-11">
                        {/* 마크다운 도구 */}
                        <div className="flex items-center gap-1">
                            {toolbarActions.map(({ icon: Icon, label, action }) => (
                                <button
                                    key={label}
                                    onClick={action}
                                    className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                    title={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>

                        {/* 통계 + 모드 전환 */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500">
                                <span>단어: {wordCount}</span>
                                <span>줄: {lineCount}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                                <button
                                    onClick={() => setActiveTab('write')}
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeTab === 'write'
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <PenLine className="w-3 h-3" />
                                    편집
                                </button>
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeTab === 'preview'
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <Eye className="w-3 h-3" />
                                    미리보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 메인 에디터 영역 */}
            <div className="flex-1 flex overflow-hidden">
                {/* 마크다운 에디터 (편집 모드) */}
                {activeTab === 'write' && (
                    <div className="flex-1 flex overflow-hidden">
                        {/* 줄 번호 */}
                        <div className="hidden sm:block py-4 pl-4 pr-2 text-right select-none overflow-hidden bg-slate-950">
                            <div className="font-mono text-xs leading-6 text-slate-600">
                                {lineNumbers.map(num => (
                                    <div key={num}>{num}</div>
                                ))}
                            </div>
                        </div>

                        {/* 텍스트 에디터 */}
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 bg-slate-950 text-slate-200 font-mono text-sm leading-6 p-4 resize-none focus:outline-none selection:bg-blue-500/30 placeholder-slate-600"
                            placeholder="마크다운으로 글을 작성하세요..."
                            spellCheck={false}
                        />
                    </div>
                )}

                {/* 마크다운 미리보기 */}
                {activeTab === 'preview' && (
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-3xl mx-auto prose prose-invert prose-slate
              prose-headings:text-white prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white
              prose-blockquote:border-blue-500 prose-blockquote:bg-blue-950/20 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
              prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-300 prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl
              prose-img:rounded-xl
              prose-li:text-slate-300
              prose-ul:text-slate-300
            ">
                            {title && <h1>{title}</h1>}
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function WritePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-slate-400 text-sm">로딩 중...</div>
            </div>
        }>
            <WritePageContent />
        </Suspense>
    )
}
