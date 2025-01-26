import { useCallback, useEffect, useState } from 'react'
import { hiragana } from '~/lib/constants/kana'
import { type ApiResponse } from '~/lib/types/dictionary.type'
import { fetchWordsByKana } from '~/lib/utils/generateKana'

export const useGenerateKana = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [middleKana] = useState<string>(
    hiragana[(Math.random() * hiragana.length) | 0]!,
  )

  const refreshKanaSet = useCallback(async () => {
    setLoading(true)
    setResponse(await fetchWordsByKana(middleKana))
    setLoading(false)
  }, [middleKana])

  useEffect(() => {
    refreshKanaSet().catch((error) =>
      console.error('Error refreshing kana:', error),
    )
  }, [refreshKanaSet, middleKana])

  return {
    kanaSet:
      response?.data[
        (Math.random() * response.data.length) | 0
      ]?.japanese[0]?.reading.split(''),
    middleKana,
    refreshKanaSet,
    loading,
  }
}
