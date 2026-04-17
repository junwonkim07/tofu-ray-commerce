'use client'

import { useMemo, useState } from 'react'
import { mockProducts } from '@tofu-ray/core'
import { ProductCard } from '@/components/product-card'
import { Input } from '@/components/ui/input'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return mockProducts

    return mockProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    )
  }, [query])

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">검색</h1>
        <p className="text-muted-foreground mt-2">원하는 VPN 구독 상품을 검색해보세요.</p>
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="상품명, 설명, 구독 종류로 검색"
      />

      <p className="text-sm text-muted-foreground">검색 결과 {filtered.length}개</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
