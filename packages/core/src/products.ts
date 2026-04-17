import type { Product } from './types'

export const mockProducts: Product[] = [
  {
    id: '1',
    handle: 'monthly',
    title: '월간제',
    description:
      '1개월 구독 플랜입니다',
    price: 30,
    currency: 'CNY',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    ],
    category: '월간',
    tags: ['vpn', '월간','한국','일본','영국'],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    handle: 'quarterly',
    title: '쿼터제',
    description:
      '3개월 구독 플랜입니다',
    price: 90,
    currency: 'CNY',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
    ],
    category: '분기',
    tags: ['vpn', '3개월', '한국', '일본', '영국'],
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '3',
    handle: 'yearly',
    title: '연간제',
    description:
      '연간 구독 플랜입니다. 월간 대비 20% 할인된 가격으로 제공됩니다.',
    price: 288,
    currency: 'CNY',
    images: [
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    ],
    category: '연간',
    tags: ['vpn', '연간', '한국', '일본', '영국'],
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: '4',
    handle: 'vpn-team-monthly',
    title: 'VPN 팀 월간 구독 (5계정)',
    description:
      '소규모 팀/가족을 위한 월간 5계정 플랜입니다. 통합 1TB 까지 사용 가능합니다.',
    price: 120,
    currency: 'CNY',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    ],
    category: '팀',
    tags: ['vpn', '팀', '동시접속', '한국', '일본', '영국'],
    inStock: true,
    rating: 4.6,
    reviewCount: 56,
  }
]

export function getProductByHandle(handle: string): Product | undefined {
  return mockProducts.find((p) => p.handle === handle)
}
