import { notFound } from 'next/navigation'
import { mockProducts, getProductByHandle } from '@tofu-ray/core'
import { ProductDetailClient } from './product-detail-client'
import { ProductCard } from '@/components/product-card'

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params
  const product = getProductByHandle(handle)
  if (!product) return { title: '상품을 찾을 수 없습니다' }
  return {
    title: `${product.title} | Tofu Ray VPN`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params
  const product = getProductByHandle(handle)
  if (!product) notFound()

  const related = mockProducts.filter((p) => p.id !== product.id && p.category === product.category)

  return (
    <div className="container py-12">
      <ProductDetailClient product={product} />

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">함께 보면 좋은 플랜</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
