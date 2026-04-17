'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Package, Bell, User, ShoppingCart, Search, MessageSquare, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-x-8 gap-y-2 py-2">
        <Link href="/" className="font-bold text-lg whitespace-nowrap flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="lacquer-regular">Tofu-ray</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium">
          <Link href="/notice" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Bell className="h-4 w-4" />
            공지사항
          </Link>
          <Link href="/mypage" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <User className="h-4 w-4" />
            마이페이지
          </Link>
          <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            장바구니 ({totalItems})
          </Link>
          <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Search className="h-4 w-4" />
            검색
          </Link>
          <Link href="/inquiry" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            문의
          </Link>
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                로그인
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">회원가입</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
