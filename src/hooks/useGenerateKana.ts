import { useCallback, useEffect, useRef, useState } from 'react'

import { hiragana } from '~/lib/constants/kana'
import { fetchWordsByKana } from '~/lib/utils/dictionaryAPI'

export const useGenerateKana = () => {
  const [kanaSet, setKanaSet] = useState<string[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const { current: middleKana } = useRef(
    hiragana[(Math.random() * hiragana.length) | 0]!,
  )

  const refreshKanaSet = useCallback(async () => {
    setLoading(true)

    const { data } = await fetchWordsByKana(middleKana)
    const randomKanaArray =
      data[(Math.random() * data.length) | 0]?.japanese[0]?.reading.split('')
    const shuffledKana = randomKanaArray?.sort(() => Math.random() - 0.5)
    shuffledKana?.splice(shuffledKana.indexOf(middleKana), 1)
    shuffledKana?.splice(3, 0, middleKana)

    setKanaSet(shuffledKana)

    setLoading(false)
  }, [middleKana])

  useEffect(() => {
    void refreshKanaSet()
  }, [refreshKanaSet, middleKana])

  return {
    kanaSet,
    middleKana,
    refreshKanaSet,
    loading,
  }
}
