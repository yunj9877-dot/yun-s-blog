'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Command, LayoutGrid, PenLine } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.reload()
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <LayoutGrid className="w-5 h-5 text-white" />
                        </div>
                        <Link href="/" className="text-xl font-bold text-white tracking-tight">
                            DevBlog
                        </Link>
                    </div>

                    {/* Search Bar - Desktop Only */}
                    <div className="hidden md:block flex-1 max-w-md mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="block w-full pl-10 pr-12 py-2 border border-slate-800 rounded-full leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm selection:bg-blue-500/30"
                                placeholder="기사 검색..."
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-slate-500 sm:text-xs flex items-center gap-1 font-medium bg-slate-800 px-1.5 py-0.5 rounded">
                                    <Command className="w-3 h-3" />K
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Links & Auth */}
                    <div className="flex items-center gap-6">

                        <div className="flex items-center gap-3 border-l border-slate-800 pl-6 ml-2">
                            {user ? (
                                <>
                                    <Link
                                        href="/write"
                                        className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        <PenLine className="w-4 h-4" />
                                        글쓰기
                                    </Link>
                                    <span className="text-sm text-slate-400 hidden sm:block">{user.email}</span>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        로그인
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
