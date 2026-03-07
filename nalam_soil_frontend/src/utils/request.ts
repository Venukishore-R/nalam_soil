const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000/api'
const APP_SECRET = import.meta.env.VITE_APP_SECRET ?? 'open-sesame'

export interface RequestConfig {
  headers?: Record<string, string>
}

type AxiosInstance = {
  post: <T>(url: string, data?: unknown, config?: RequestConfig) => Promise<T>
}

const buildHeaders = (config?: RequestConfig) => ({
  'Content-Type': 'application/json',
  'X-App-Secret': APP_SECRET,
  ...(config?.headers ?? {}),
})

const request: AxiosInstance = {
  async post<T>(url: string, data?: unknown, config?: RequestConfig) {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: buildHeaders(config),
      body: data ? JSON.stringify(data) : undefined,
    })

    const body = (await response.json()) as T & { message?: string }

    if (!response.ok) {
      throw new Error(body.message ?? 'Request failed')
    }

    return body
  },
}

export default request
