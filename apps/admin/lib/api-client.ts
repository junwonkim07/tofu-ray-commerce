const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface ApiResponse<T> {
  data?: T
  error?: string
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string> | undefined) || {}),
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      try {
        const errorData = await response.json()
        return { error: errorData.error || `HTTP ${response.status}: ${response.statusText}` }
      } catch (parseError) {
        // If JSON parsing fails, return status-based error
        return { error: `Server error (${response.status}): ${response.statusText}` }
      }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('API Error:', error)
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}

// Order API
export const adminOrderAPI = {
  getAll: () =>
    fetchAPI<any[]>('/api/orders', {
      method: 'GET',
    }),

  getByNumber: (orderNumber: string) =>
    fetchAPI<any>(`/api/orders/${orderNumber}`, {
      method: 'GET',
    }),

  updateStatus: (orderNumber: string, status: string) =>
    fetchAPI<any>(`/api/orders/${orderNumber}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

// Inquiry API
export const adminInquiryAPI = {
  getAll: () =>
    fetchAPI<any[]>('/api/inquiries', {
      method: 'GET',
    }),

  getById: (inquiryId: string) =>
    fetchAPI<any>(`/api/inquiries/${inquiryId}`, {
      method: 'GET',
    }),

  addMessage: (inquiryId: string, messageData: any) =>
    fetchAPI<any>(`/api/inquiries/${inquiryId}/messages`, {
      method: 'POST',
      body: JSON.stringify(messageData),
    }),
}

// Notice API
export const adminNoticeAPI = {
  getAll: () =>
    fetchAPI<any[]>('/api/notices', {
      method: 'GET',
    }),

  getById: (noticeId: string) =>
    fetchAPI<any>(`/api/notices/${noticeId}`, {
      method: 'GET',
    }),

  create: (noticeData: any) =>
    fetchAPI<any>('/api/notices', {
      method: 'POST',
      body: JSON.stringify(noticeData),
    }),

  addComment: (noticeId: string, commentData: any) =>
    fetchAPI<any>(`/api/notices/${noticeId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    }),
}
