'use client'

import Link from 'next/link'
import { Package } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Package className="h-6 w-6" />
          <span>Tofu Ray</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/account"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            계정 정보
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
        </nav>
      </div>
    </header>
  )
}
