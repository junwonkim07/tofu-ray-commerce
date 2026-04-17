'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-x-8 gap-y-2 py-2">
        <Link href="/" className="font-bold text-lg whitespace-nowrap">
          Tofu Ray VPN
        </Link>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
          <Link href="/notice" className="text-muted-foreground hover:text-foreground transition-colors">
            공지사항
          </Link>
          <Link href="/mypage" className="text-muted-foreground hover:text-foreground transition-colors">
            마이페이지
          </Link>
          <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
            장바구니 ({totalItems})
          </Link>
          <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
            검색
          </Link>
          <Link href="/inquiry" className="text-muted-foreground hover:text-foreground transition-colors">
            문의
          </Link>
        </nav>
      </div>
    </header>
  )
}
