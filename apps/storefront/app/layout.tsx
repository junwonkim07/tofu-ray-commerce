import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: '두부레이 커머스',
  description: 'Next.js와 shadcn/ui로 만든 커머스 스토어프론트',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className="font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t py-8 mt-16">
            <div className="container text-center text-sm text-muted-foreground">
              <p>© 2024 두부레이 커머스. 모든 권리 보유.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
