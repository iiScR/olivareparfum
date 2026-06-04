import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { CartDrawer } from '@/components/sections/CartDrawer'
import { Toaster } from '@/components/ui/Toaster'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'EMAT SCENTS | Le parfum que vous aimez, jusqu\'à 93% plus accessible',
  description: 'Découvrez nos dupes de parfums de luxe inspirés des plus grandes maisons. Qualité exceptionnelle à prix accessible. Livraison au Maroc.',
  keywords: 'parfum, dupe, luxe, Tom Ford, Chanel, YSL, Maroc, parfumerie',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EMAT SCENTS',
    title: 'EMAT SCENTS | Parfums de luxe accessibles',
    description: 'Découvrez nos dupes de parfums de luxe inspirés des plus grandes maisons.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-background text-text-primary font-body">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster />
      </body>
    </html>
  )
}
