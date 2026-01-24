import { useEffect, useMemo, useState } from 'react'

type UseFetchResult<Type> = {
  data: Type
  error: unknown
  isLoading: boolean
}

type FetchOptions = Parameters<typeof fetch>[1]

/**
 * Small convenience hook around `fetch`.
 *
 * Notes:
 * - Avoid passing a freshly-created `options` object every render (memoize it),
 *   otherwise React will treat it as changed and this will refetch.
 * - `credentials: 'include'` is always enforced (cookies/session).
 */
export const useFetch = <Type>(
  url: string,
  options?: FetchOptions
): UseFetchResult<Type> => {
  const [data, setData] = useState<Type>({} as Type)
  const [error, setError] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestInit = useMemo<FetchOptions>(() => {
    return { ...(options ?? {}), credentials: 'include' }
  }, [options])

  useEffect(() => {
    const controller = new AbortController()

    const runFetch = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch(url, { ...requestInit, signal: controller.signal })
        const json = await res.json()
        setData(json)
      } catch (err) {
        // Ignore abort errors (unmount / url change)
        if ((err as { name?: string } | null)?.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    runFetch()
    return () => controller.abort()
  }, [requestInit, url])

  return { data, error, isLoading }
}

