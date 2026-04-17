'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CommentItem {
  id: string
  author: string
  content: string
  createdAt: string
}

interface NoticePost {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  comments: CommentItem[]
}

const initialPosts: NoticePost[] = [
  {
    id: 'n1',
    title: 'VPN 구독 발급 안내',
    content: '결제 후 문의 탭에서 주문번호를 남겨주시면 순차적으로 구독 링크를 전달해드립니다.',
    author: '관리자',
    createdAt: '2026-04-17 21:00',
    comments: [
      {
        id: 'c1',
        author: '운영팀',
        content: '야간에도 문의 남겨주시면 다음 영업일에 빠르게 처리합니다.',
        createdAt: '2026-04-17 21:10',
      },
    ],
  },
]

export default function NoticePage() {
  const [posts, setPosts] = useState<NoticePost[]>(initialPosts)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})

  const totalComments = useMemo(
    () => posts.reduce((sum, post) => sum + post.comments.length, 0),
    [posts]
  )

  const addPost = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) return

    const now = new Date().toLocaleString('ko-KR')
    const newPost: NoticePost = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      createdAt: now,
      comments: [],
    }

    setPosts((prev) => [newPost, ...prev])
    setTitle('')
    setContent('')
    setAuthor('')
  }

  const addComment = (postId: string) => {
    const draft = commentDrafts[postId]?.trim()
    if (!draft) return

    const newComment: CommentItem = {
      id: crypto.randomUUID(),
      author: '방문자',
      content: draft,
      createdAt: new Date().toLocaleString('ko-KR'),
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    )
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }))
  }

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">공지사항</h1>
        <p className="text-muted-foreground mt-2">
          총 {posts.length}개의 게시글 · {totalComments}개의 댓글
        </p>
      </div>

      <form onSubmit={addPost} className="border rounded-lg bg-card p-6 space-y-3">
        <h2 className="text-lg font-semibold">새 공지 작성</h2>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" required />
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="작성자" required />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="공지 내용을 입력하세요"
          rows={4}
          required
        />
        <Button type="submit">글 올리기</Button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg bg-card p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {post.author} · {post.createdAt}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{post.content}</p>

            <div className="space-y-3 border-t pt-4">
              <h4 className="font-medium text-sm">댓글 {post.comments.length}개</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="rounded-md border bg-background px-3 py-2 text-sm">
                  <p>{comment.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {comment.author} · {comment.createdAt}
                  </p>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  value={commentDrafts[post.id] ?? ''}
                  onChange={(e) =>
                    setCommentDrafts((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                  placeholder="댓글을 입력하세요"
                />
                <Button type="button" onClick={() => addComment(post.id)}>
                  댓글 달기
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
