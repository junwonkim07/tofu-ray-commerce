'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type InquiryMode = 'chat' | 'wechat'

interface Message {
  id: string
  sender: 'user' | 'admin'
  text: string
}

export default function InquiryPage() {
  const [mode, setMode] = useState<InquiryMode>('chat')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'admin',
      text: '안녕하세요! 주문번호를 보내주시면 구독 정보와 링크를 안내해드릴게요.',
    },
  ])
  const [draft, setDraft] = useState('')

  const sendMessage = () => {
    const content = draft.trim()
    if (!content) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: content,
    }

    const adminReply: Message = {
      id: crypto.randomUUID(),
      sender: 'admin',
      text: '확인했습니다. 결제 내역 확인 후 VPN 구독 종류/만료일/접속 링크를 전달드리겠습니다.',
    }

    setMessages((prev) => [...prev, userMessage, adminReply])
    setDraft('')
  }

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">문의</h1>
        <p className="text-muted-foreground mt-2">
          자체 채팅 또는 위챗 문의 중 편한 방식을 선택해서 구독 발급을 요청하세요.
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant={mode === 'chat' ? 'default' : 'outline'} onClick={() => setMode('chat')}>
          자체 채팅 문의
        </Button>
        <Button variant={mode === 'wechat' ? 'default' : 'outline'} onClick={() => setMode('wechat')}>
          위챗 문의
        </Button>
      </div>

      {mode === 'chat' ? (
        <section className="border rounded-lg bg-card p-4 space-y-4">
          <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-md px-3 py-2 text-sm w-fit max-w-[80%] ${
                  message.sender === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="주문번호 또는 문의 내용을 입력하세요"
            />
            <Button type="button" onClick={sendMessage}>
              전송
            </Button>
          </div>
        </section>
      ) : (
        <section className="border rounded-lg bg-card p-6 space-y-3">
          <h2 className="text-xl font-semibold">위챗 문의 안내</h2>
          <p className="text-sm text-muted-foreground">
            아래 위챗 ID로 연락 주시면 결제 확인 후 구독 정보와 접속 링크를 보내드립니다.
          </p>
          <div className="rounded-md border bg-background p-4 text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">WeChat ID:</span> tofuray_support
            </p>
            <p>
              <span className="text-muted-foreground">운영시간:</span> 10:00 - 22:00 (KST)
            </p>
            <p>
              <span className="text-muted-foreground">안내:</span> 주문번호를 함께 전달해 주세요.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
