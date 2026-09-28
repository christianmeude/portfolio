import type { Metadata } from 'next'
import { Barlow_Condensed, Montserrat, Space_Mono } from 'next/font/google'
import './globals.css'

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})
const body = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Christian Meude — Mobile, Web & Systems Developer',
  description:
    'Portfolio of Christian Meude: shipped mobile + web + systems work, stack, and contact. Open to roles and freelance.',
  metadataBase: new URL('https://meude-portfolio.vercel.app'),
  openGraph: {
    title: 'Christian Meude — Developer Portfolio',
    description: 'Shipped work, honest stack, one email away.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-[#f5f2ee] text-[#0a0a0a] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:border-[3px] focus:border-[#0a0a0a] focus:bg-[#0a0a0a] focus:px-4 focus:py-2 focus:font-bold focus:text-[#f5f2ee]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
