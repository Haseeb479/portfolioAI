import type { Metadata } from 'next'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'

/* ============================================================
   FONT CONFIGURATION
   ============================================================ */
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
})

const inter = Inter({
  weight: ['300', '400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/* ============================================================
   METADATA
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL('https://haseeb.ai'),
  title: 'Haseeb Tariq — AI/ML Engineer',
  description:
    'AI/ML Engineer specializing in production-grade machine learning systems, large language models, and intelligent automation. Building scalable AI infrastructure that bridges research and real-world impact.',
  keywords: [
    'AI Engineer',
    'ML Engineer',
    'Machine Learning',
    'Large Language Models',
    'LLM',
    'Deep Learning',
    'Python',
    'PyTorch',
    'TensorFlow',
    'MLOps',
    'Haseeb Tariq',
  ],
  authors: [{ name: 'Haseeb Tariq' }],
  creator: 'Haseeb Tariq',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://haseeb.ai',
    siteName: 'Haseeb Tariq',
    title: 'Haseeb Tariq — AI/ML Engineer',
    description:
      'AI/ML Engineer specializing in production-grade machine learning systems, large language models, and intelligent automation.',
    images: [
      {
        url: '/img/project-whatsapp.jpg',
        width: 1200,
        height: 630,
        alt: 'Haseeb Tariq — AI/ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haseeb Tariq — AI/ML Engineer',
    description:
      'AI/ML Engineer specializing in production-grade machine learning systems, large language models, and intelligent automation.',
    images: ['/img/project-whatsapp.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${ibmPlexMono.variable} ${inter.variable} font-sans antialiased`}
      >
        {/* Grain texture overlay */}
        <div id="grain" aria-hidden="true" />

        {/* Main content */}
        {children}
      </body>
    </html>
  )
}
