import { resetPassword } from '@/app/actions/auth'
import Link from 'next/link'
import { Code2, Mail } from 'lucide-react'

export default async function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    const { message } = await searchParams

    return (
        <div className="w-full max-w-md mx-auto relative mt-12 mb-20">
            <div className="bg-[#151c24] border border-[#2a3441] rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#182333] border border-[#263245] rounded-xl p-3 mb-4">
                        <Code2 size={24} className="text-blue-500" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">비밀번호 찾기</h1>
                    <p className="text-gray-400 text-sm text-center">
                        가입하신 이메일 주소를 입력하시면<br />
                        비밀번호 재설정 링크를 보내드립니다.
                    </p>
                </div>

                <form className="space-y-6" action={resetPassword}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block" htmlFor="email">
                            이메일 주소
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Mail size={18} />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="dev@example.com"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3441] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    >
                        재설정 링크 보내기
                    </button>

                    {message && (
                        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-sm text-center">
                            {message}
                        </div>
                    )}
                </form>

                <div className="mt-8 pt-6 border-t border-[#2a3441] text-center">
                    <p className="text-gray-400 text-sm">
                        비밀번호가 기억나셨나요?{' '}
                        <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
