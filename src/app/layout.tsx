import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ce-17.vercel.app'),
  title: 'Ceo',
  description: 'Portfolio of Roblox builds and military community leadership by Ceo (17).',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Ceo — Portfolio',
    description: 'Roblox builder, scripter, graphic artist and community manager. 5+ years building large-scale environments and leading military communities.',
    url: 'https://ce-17.vercel.app',
    siteName: 'Ceo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceo — Portfolio',
    description: 'Roblox builder, scripter, graphic artist and community manager.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
