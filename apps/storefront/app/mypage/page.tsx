const loginInfo = {
  id: 'junwonkim07',
  email: 'junwonkim07@example.com',
  lastLogin: '2026-04-17 20:42',
}

const subscriptionInfo = {
  product: 'VPN Subscription - Premium',
  planType: '연간 구독',
  expiresAt: '2027-04-17',
  status: '활성',
}

export default function MyPage() {
  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">마이페이지</h1>
        <p className="text-muted-foreground mt-2">현재 로그인 정보와 VPN 구독 정보를 확인할 수 있습니다.</p>
      </div>

      <section className="border rounded-lg bg-card p-6 space-y-3">
        <h2 className="text-xl font-semibold">로그인 정보</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">아이디</dt>
            <dd className="font-medium">{loginInfo.id}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">이메일</dt>
            <dd className="font-medium">{loginInfo.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">최근 로그인</dt>
            <dd className="font-medium">{loginInfo.lastLogin}</dd>
          </div>
        </dl>
      </section>

      <section className="border rounded-lg bg-card p-6 space-y-3">
        <h2 className="text-xl font-semibold">구독 정보 (VPN Subscription)</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">구독 종류</dt>
            <dd className="font-medium">{subscriptionInfo.planType}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">상품명</dt>
            <dd className="font-medium">{subscriptionInfo.product}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">만료일</dt>
            <dd className="font-medium">{subscriptionInfo.expiresAt}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">상태</dt>
            <dd className="font-medium">{subscriptionInfo.status}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
