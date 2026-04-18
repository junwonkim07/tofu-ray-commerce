'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { adminInquiryAPI } from '@/lib/api-client'

interface InquiryMessage {
  id: string
  sender: string
  messageType: string
  content: string
  createdAt: string
}

interface InquiryDetail {
  id: string
  subject: string
  status: string
  createdAt: string
  messages: InquiryMessage[]
}

export default function InquiryDetailPage() {
  const params = useParams<{ id: string }>()
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadInquiry = async () => {
      setIsLoading(true)
      const result = await adminInquiryAPI.getById(params.id)
      if (result.data) {
        setInquiry(result.data)
      }
      setIsLoading(false)
    }

    loadInquiry()
  }, [params.id])

  const handleReply = async () => {
    if (!inquiry || !message.trim()) return
    setIsSaving(true)
    const result = await adminInquiryAPI.addMessage(inquiry.id, {
      sender: 'admin',
      content: message.trim(),
      messageType: 'text',
    })
    if (result.data) {
      setInquiry((prev) =>
        prev
          ? {
              ...prev,
              messages: [
                ...prev.messages,
                {
                  id: result.data.messageId,
                  sender: 'admin',
                  messageType: 'text',
                  content: message.trim(),
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : prev
      )
      setMessage('')
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">로딩 중...</div>
  }

  if (!inquiry) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline">
          <Link href="/dashboard/inquiries">목록으로</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/inquiries" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              문의 목록으로 돌아가기
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">문의 상세</h1>
          <p className="text-muted-foreground mt-1">{inquiry.subject}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>메시지</CardTitle>
            <CardDescription>{inquiry.status}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inquiry.messages?.map((item) => (
              <div key={item.id} className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">{item.sender}</p>
                <p className="mt-1 whitespace-pre-wrap">{item.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>답변 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-40 rounded-md border border-input bg-background p-3"
              placeholder="답변을 입력하세요"
            />
            <Button onClick={handleReply} disabled={isSaving || !message.trim()}>
              {isSaving ? '전송 중...' : '답변 전송'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
