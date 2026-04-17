import type { Product } from './types'

export const mockProducts: Product[] = [
  {
    id: '1',
    handle: 'vpn-monthly-basic',
    title: 'VPN 베이직 월간 구독',
    description:
      '가볍게 시작하는 1개월 VPN 구독 플랜입니다. 한국 서버 포함 주요 지역 서버를 이용할 수 있으며 모바일/PC를 동시에 보호합니다.',
    price: 12900,
    currency: 'KRW',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    ],
    category: '월간',
    tags: ['vpn', '월간', '입문'],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    handle: 'vpn-quarterly-standard',
    title: 'VPN 스탠다드 3개월 구독',
    description:
      '가성비 중심의 3개월 플랜입니다. 스트리밍/게임/해외 접속에 최적화된 속도를 제공하고, 문의 채널을 통한 빠른 발급을 지원합니다.',
    price: 33900,
    currency: 'KRW',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
    ],
    category: '분기',
    tags: ['vpn', '3개월', '가성비'],
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '3',
    handle: 'vpn-yearly-premium',
    title: 'VPN 프리미엄 연간 구독',
    description:
      '가장 많은 혜택을 제공하는 12개월 플랜입니다. 우선 지원, 다중 디바이스, 고급 보안 옵션이 포함되며 장기 이용자에게 적합합니다.',
    price: 109000,
    currency: 'KRW',
    images: [
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    ],
    category: '연간',
    tags: ['vpn', '연간', '프리미엄'],
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: '4',
    handle: 'vpn-team-monthly',
    title: 'VPN 팀 월간 구독 (5계정)',
    description:
      '소규모 팀/가족을 위한 월간 5계정 플랜입니다. 계정별 접속 기록 분리와 안정적인 동시 접속이 가능합니다.',
    price: 45900,
    currency: 'KRW',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    ],
    category: '팀',
    tags: ['vpn', '팀', '동시접속'],
    inStock: true,
    rating: 4.6,
    reviewCount: 56,
  },
  {
    id: '5',
    handle: 'vpn-global-stream',
    title: 'VPN 글로벌 스트리밍 플랜',
    description:
      '해외 콘텐츠 이용에 특화된 플랜입니다. 지역 제한 우회 성능을 강화했고 고속 서버 라우팅을 제공합니다.',
    price: 52900,
    currency: 'KRW',
    images: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
      'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=800&q=80',
    ],
    category: '특화',
    tags: ['vpn', '스트리밍', '해외'],
    inStock: false,
    rating: 4.5,
    reviewCount: 41,
  },
  {
    id: '6',
    handle: 'vpn-business-annual',
    title: 'VPN 비즈니스 연간 구독',
    description:
      '비즈니스 환경에 맞춘 연간 플랜으로, 전용 지원과 접근 제어 가이드를 제공합니다. 문의를 통해 맞춤 세팅을 지원합니다.',
    price: 189000,
    currency: 'KRW',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    ],
    category: '기업',
    tags: ['vpn', '기업', '보안'],
    inStock: true,
    rating: 4.8,
    reviewCount: 78,
  },
]

export function getProductByHandle(handle: string): Product | undefined {
  return mockProducts.find((p) => p.handle === handle)
}
