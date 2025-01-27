import { useState } from 'react'

export const useWord = () => {
  const [word, setWord] = useState<string>('')

  const addKana = (kana: string) => () => {
    setWord((prev) => prev + kana)
  }

  const clean = () => {
    setWord('')
  }

  return { word, addKana, clean }
}
