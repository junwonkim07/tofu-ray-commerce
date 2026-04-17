import Link from 'next/link'
import type { Product } from '@tofu-ray/core'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface ProductCardProps {
  product: Product
}

function getEnglishLabel(handle: string): string {
  const labelMap: Record<string, string> = {
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    'vpn-team-monthly': 'Family',
  }
  return labelMap[handle] || handle
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.handle}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-5xl md:text-6xl font-bold lacquer-regular text-primary break-words">
              {getEnglishLabel(product.handle)}
            </h2>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                품절
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">{product.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="font-bold">{formatPrice(product.price, product.currency)}</span>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
