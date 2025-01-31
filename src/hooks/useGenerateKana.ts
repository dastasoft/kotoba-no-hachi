import { useCallback, useEffect, useRef, useState } from 'react'

import { hiragana } from '~/lib/constants/kana'
import { fetchWordsByKana } from '~/lib/utils/dictionaryAPI'

export const useGenerateKana = () => {
  const [kanaSet, setKanaSet] = useState<string[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const middleKanaRef = useRef(hiragana[(Math.random() * hiragana.length) | 0]!)

  const refreshKanaSet = useCallback(async () => {
    setLoading(true)

    middleKanaRef.current = hiragana[(Math.random() * hiragana.length) | 0]!
    const { data } = await fetchWordsByKana(middleKanaRef.current)
    const randomKanaArray =
      data[(Math.random() * data.length) | 0]?.kana.split('')
    const shuffledKana = randomKanaArray?.sort(() => Math.random() - 0.5)
    shuffledKana?.splice(shuffledKana.indexOf(middleKanaRef.current), 1)
    shuffledKana?.splice(3, 0, middleKanaRef.current)

    setKanaSet(shuffledKana)

    setLoading(false)
  }, [])

  useEffect(() => {
    void refreshKanaSet()
  }, [refreshKanaSet])

  return {
    kanaSet,
    middleKana: middleKanaRef.current,
    refreshKanaSet,
    loading,
  }
}
