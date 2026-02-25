'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Share2, Bookmark, Heart, MessageCircle, PenLine, Copy, Check } from 'lucide-react'
import { User } from '@supabase/supabase-js'

const ADMIN_EMAIL = 'yunj9877@gmail.com'

interface PostActionsProps {
    postId: string
    postUserId: string | null
}

export function PostActions({ postId, postUserId }: PostActionsProps) {
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)
    const [copied, setCopied] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
        }
        getUser()
    }, [])

    const handleShare = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // fallback
        }
    }

    const canEdit = user && (user.id === postUserId || user.email === ADMIN_EMAIL)

    return (
        <>
            {/* 데스크톱: 수정/공유/북마크 버튼 */}
            <div className="flex items-center gap-3">
                {canEdit && (
                    <Link
                        href={`/write?id=${postId}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
                    >
                        <PenLine className="w-4 h-4" />
                        수정
                    </Link>
                )}
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    {copied ? '복사됨!' : '공유'}
                </button>
                <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2 rounded-lg transition-colors border ${bookmarked
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                        : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
                        }`}
                >
                    <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
            </div>
        </>
    )
}

export function FloatingBar() {
    const [liked, setLiked] = useState(false)

    return (
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
            <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${liked
                    ? 'bg-blue-600 text-white shadow-blue-500/30'
                    : 'bg-slate-800/80 backdrop-blur text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
                    }`}
            >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all shadow-lg">
                <MessageCircle className="w-5 h-5" />
            </button>
        </div>
    )
}

export function MobileBar() {
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // fallback
        }
    }

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 p-4 z-40">
            <div className="flex items-center justify-around max-w-md mx-auto">
                <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${liked ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">좋아요</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">댓글</span>
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{copied ? '복사됨!' : '공유'}</span>
                </button>
                <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${bookmarked ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                >
                    <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                    <span className="text-sm">저장</span>
                </button>
            </div>
        </div>
    )
}
