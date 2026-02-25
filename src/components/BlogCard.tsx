import Image from 'next/image'
import Link from 'next/link'

interface PostProps {
    post: {
        id: string
        title: string
        excerpt: string
        category: string
        image_url: string
        author_name: string
        author_avatar_url: string
        read_time: string
        created_at: string
    }
}

export function BlogCard({ post }: PostProps) {
    // Map category to brand colors to match design
    const getCategoryColor = (category: string) => {
        switch (category.toUpperCase()) {
            case 'REACT': return 'text-sky-400'
            case 'DEVOPS': return 'text-emerald-400'
            case 'DESIGN': return 'text-pink-400'
            case 'TYPESCRIPT': return 'text-blue-500'
            case 'BACKEND': return 'text-orange-400'
            default: return 'text-indigo-400'
        }
    }

    const categoryColor = getCategoryColor(post.category)
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <article className="group flex flex-col gap-4 overflow-hidden rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Decorative elements from design */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700/50 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/50" />
                    </div>
                </div>
            </div>

            <div className="p-6 pt-2 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-sm font-medium mb-3">
                    <span className={`${categoryColor} tracking-wider font-semibold uppercase`}>
                        {post.category}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{post.read_time}</span>
                </div>

                <Link href={`/posts/${post.id}`} className="block mt-1">
                    <h3 className="text-xl font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                    </h3>
                </Link>
                <p className="mt-3 text-slate-400 line-clamp-2 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-800/60 mt-auto">
                    <Image
                        src={post.author_avatar_url}
                        alt={post.author_name}
                        width={32}
                        height={32}
                        className="rounded-full bg-slate-800"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-200">{post.author_name}</span>
                        <span className="text-xs text-slate-500">{formattedDate}</span>
                    </div>
                </div>
            </div>
        </article>
    )
}
