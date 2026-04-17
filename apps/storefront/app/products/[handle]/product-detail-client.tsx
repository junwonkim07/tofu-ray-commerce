'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@tofu-ray/core'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react'

interface ProductDetailClientProps {
  product: Product
}

function getEnglishLabel(handle: string): string {
  const labelMap: Record<string, string> = {
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    'vpn-team-monthly': '5-account team',
  }
  return labelMap[handle] || handle
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="flex items-center justify-center">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-6xl md:text-7xl font-bold lacquer-regular text-primary break-words">
              {getEnglishLabel(product.handle)}
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{product.category}</Badge>
            {product.inStock ? (
              <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                판매중
              </Badge>
            ) : (
              <Badge variant="destructive">품절</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
        </div>

        <div className="text-3xl font-bold">{formatPrice(product.price, product.currency)}</div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">상품 설명</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">수량</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
            {added ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                장바구니에 담았습니다
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? '장바구니 담기' : '품절'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
