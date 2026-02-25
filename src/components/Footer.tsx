import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'

export function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-800 p-1.5 rounded-lg opacity-80">
                            <LayoutGrid className="w-4 h-4 text-slate-300" />
                        </div>
                        <span className="text-sm font-semibold text-slate-300">DevBlog</span>
                        <span className="text-sm border-l border-slate-700 pl-3 ml-1">© 2024</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-medium">
                        <Link href="#" className="hover:text-white transition-colors">트위터</Link>
                        <Link href="#" className="hover:text-white transition-colors">깃허브</Link>
                        <Link href="#" className="hover:text-white transition-colors">RSS 피드</Link>
                        <Link href="#" className="hover:text-white transition-colors">이용약관 및 정책</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
