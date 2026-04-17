import { mockProducts } from '@tofu-ray/core'
import { ProductCard } from '@/components/product-card'

export const metadata = {
  title: '구독 상품 | Tofu Ray VPN',
}

export default function ProductsPage() {
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)))

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">전체 구독 상품</h1>
        <p className="text-muted-foreground mt-2">{mockProducts.length}개의 플랜이 준비되어 있습니다.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-sm font-medium text-muted-foreground py-1">구독 유형:</span>
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-sm px-3 py-1 rounded-full border bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
