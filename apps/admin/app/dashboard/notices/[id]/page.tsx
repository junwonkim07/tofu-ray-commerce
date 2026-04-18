'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { adminNoticeAPI } from '@/lib/api-client'

interface NoticeComment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface NoticeDetail {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  comments: NoticeComment[]
}

export default function NoticeDetailPage() {
  const params = useParams<{ id: string }>()
  const [notice, setNotice] = useState<NoticeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNotice = async () => {
      setIsLoading(true)
      const result = await adminNoticeAPI.getById(params.id)
      if (result.data) {
        setNotice(result.data)
      }
      setIsLoading(false)
    }

    loadNotice()
  }, [params.id])

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">로딩 중...</div>
  }

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline">
          <Link href="/dashboard/notices">목록으로</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/notices" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              공지사항 목록으로 돌아가기
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">공지사항 상세</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>{notice.title}</CardTitle>
            <CardDescription>{notice.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap leading-relaxed">{notice.content}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>댓글</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notice.comments?.length ? (
              notice.comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{comment.author}</span>
                    <span>{new Date(comment.createdAt).toLocaleString('ko-KR')}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">댓글이 없습니다.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
