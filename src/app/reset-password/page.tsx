'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Code2, Lock } from 'lucide-react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.')
            return
        }

        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.')
            return
        }

        setLoading(true)

        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        setMessage('비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다...')
        setTimeout(() => {
            router.push('/login?message=' + encodeURIComponent('비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.'))
        }, 2000)
    }

    return (
        <div className="w-full max-w-md mx-auto relative mt-12 mb-20">
            <div className="bg-[#151c24] border border-[#2a3441] rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#182333] border border-[#263245] rounded-xl p-3 mb-4">
                        <Code2 size={24} className="text-blue-500" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">새 비밀번호 설정</h1>
                    <p className="text-gray-400 text-sm text-center">
                        새로운 비밀번호를 입력해주세요.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block" htmlFor="password">
                                새 비밀번호
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3441] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block" htmlFor="confirmPassword">
                                비밀번호 확인
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3441] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    >
                        {loading ? '변경 중...' : '비밀번호 변경'}
                    </button>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm text-center">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
