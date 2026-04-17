import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Tofu Ray VPN 구독 스토어',
  description: 'VPN 구독 상품을 구매하고 문의 채널로 안내받는 스토어입니다.',
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
              <p>© 2026 Tofu Ray VPN. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
