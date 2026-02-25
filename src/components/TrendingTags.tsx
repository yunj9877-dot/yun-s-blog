'use client'

interface TrendingTagsProps {
    categories: string[]
    activeCategory: string | null
    onSelectCategory: (category: string | null) => void
}

export function TrendingTags({ categories, activeCategory, onSelectCategory }: TrendingTagsProps) {
    return (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                인기 태그
            </h3>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${activeCategory === null
                            ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                            : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                        }`}
                >
                    # 전체 글
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${activeCategory === category
                                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                                : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        # {category}
                    </button>
                ))}
            </div>
        </div>
    )
}
