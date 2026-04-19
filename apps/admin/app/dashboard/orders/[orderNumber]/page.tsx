'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { adminOrderAPI } from '@/lib/api-client'

interface OrderItem {
  product: {
    title: string
    handle: string
  }
  quantity: number
  price: number
  currency: string
}

interface OrderDetail {
  id: string
  orderNumber: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  totalPrice: number
  currency: string
  status: string
  createdAt: string
  items: OrderItem[]
}

export default function OrderDetailPage() {
  const params = useParams<{ orderNumber: string }>()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [status, setStatus] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOrder = async () => {
      setIsLoading(true)
      const result = await adminOrderAPI.getByNumber(params.orderNumber)

      if (result.data) {
        setOrder(result.data)
        setStatus(result.data.status || 'pending')
      } else if (result.error) {
        setError(result.error)
      }

      setIsLoading(false)
    }

    loadOrder()
  }, [params.orderNumber])

  const handleSave = async () => {
    if (!order) return
    setIsSaving(true)
    const result = await adminOrderAPI.updateStatus(order.orderNumber, status)
    if (result.error) {
      setError(result.error)
    } else {
      setOrder((prev) => (prev ? { ...prev, status } : prev))
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">로딩 중...</div>
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <p className="text-red-500">{error || '주문을 찾을 수 없습니다.'}</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/orders">목록으로</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/orders" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              주문 목록으로 돌아가기
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">주문 상세</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>{order.orderNumber}</CardTitle>
            <CardDescription>{order.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">이름</p>
                <p>{order.firstName} {order.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">연락처</p>
                <p>{order.phone || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">주소</p>
                <p>{[order.address, order.city, order.state, order.postalCode, order.country].filter(Boolean).join(' ') || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">총액</p>
                <p className="font-semibold">{order.totalPrice.toLocaleString()} {order.currency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주문 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant={order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'danger' : 'warning'}>
              {order.status}
            </Badge>
            <div className="flex gap-3">
              <Input value={status} onChange={(e) => setStatus(e.target.value)} />
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? '저장 중...' : '상태 저장'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>상품</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.items?.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-medium">{item.product?.title || item.product?.handle || '상품'}</p>
                  <p className="text-sm text-muted-foreground">수량 {item.quantity}</p>
                </div>
                <p>{(item.price * item.quantity).toLocaleString()} {item.currency}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
