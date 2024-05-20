import { useState, useEffect } from 'react'

export const useFetch = <Type>(
  url: string,
  options: any
): { data: Type; error: any; isLoading: boolean } => {
  const [data, setData] = useState<Type>({} as Type)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const runFetch = async () => {
      setIsLoading(true)
      try {
        options['credentials'] = 'include'
        const res = await fetch(url, options)
        const json = await res.json()
        setData(json)
        setIsLoading(false)
      } catch (error: any) {
        setError(error)
      }
    }
    runFetch()
  }, [options, url])
  return { data, error, isLoading }
}
