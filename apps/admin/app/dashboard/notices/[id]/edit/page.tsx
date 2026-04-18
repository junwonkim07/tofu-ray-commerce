'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EditNoticePage() {
  const params = useParams<{ id: string }>()

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>공지사항 수정 준비 중</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            공지사항 {params.id} 편집 페이지는 다음 단계에서 연결할 수 있습니다.
          </p>
          <Button asChild>
            <Link href={`/dashboard/notices/${params.id}`}>상세로 돌아가기</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
