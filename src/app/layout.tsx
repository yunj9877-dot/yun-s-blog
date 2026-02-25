import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevBlog - Engineering Insights',
  description: 'Deep technical dives, architectural patterns, and actionable tips for modern software development.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-300 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
