import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { sitePath } from '@/lib/site-path'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const initialBackground = {
  backgroundColor: '#253131',
  backgroundImage: 'linear-gradient(to top right, #729797, #253131)',
}

export const metadata: Metadata = {
  title: 'Clavis Concierge | Premium Lifestyle Management',
  description: 'Clavis Concierge by Elizabeth Klyukhina - Your exclusive gateway to premium family, business, travel, lifestyle, and executive support services.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: sitePath('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: sitePath('/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: sitePath('/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: sitePath('/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={initialBackground}>
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`} style={initialBackground}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
