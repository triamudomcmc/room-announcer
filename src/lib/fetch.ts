import { useCallback, useEffect, useState } from 'react'

export function mockFetch<T>(data: T, delay = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

export function httpFetch<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json())
}

export function useFetch<T>(
  url: string,
  mockData?: T,
): { data: T | null; loading: boolean; reFetch: () => void } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (mockData) {
      mockFetch<T>(mockData).then((data) => {
        setData(data)
        setLoading(false)
      })
    } else {
      httpFetch<T>(url).then((data) => {
        setData(data)
        setLoading(false)
      })
    }
  }, [url, mockData])

  const reFetch = useCallback(() => {
    setLoading(true)
    if (mockData) {
      mockFetch<T>(mockData).then((data) => {
        setData(data)
        setLoading(false)
      })
    } else {
      httpFetch<T>(url).then((data) => {
        setData(data)
        setLoading(false)
      })
    }
  }, [url, mockData])

  return { data, loading, reFetch }
}
