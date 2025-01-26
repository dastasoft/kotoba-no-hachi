import { type ApiResponse } from '../types/dictionary.type'

const PROXY = 'https://cors-proxy.fringe.zone/'
const ENDPOINT = 'https://jisho.org/api/v1/search/words?keyword='
const WILDCARD = '%3F'

export type KanaMatchState = 'NO_MATCH' | 'MATCH' | 'INVALID_INPUT'

const generateQueryString = (middleKana: string): string => {
  const placeholders = Array(7).fill(WILDCARD)
  const randomIndex = Math.floor(Math.random() * placeholders.length)

  placeholders[randomIndex] = middleKana
  const queryString = placeholders.join('')

  return `${queryString}`
}

export async function isMatch(
  inputWord: string,
  middleKana: string,
): Promise<KanaMatchState> {
  if (inputWord.length < 2 || !inputWord.includes(middleKana))
    return 'INVALID_INPUT'

  const response = await fetchWord(inputWord)
  return response.data.length > 0 ? 'MATCH' : 'NO_MATCH'
}

export const fetchWord = async (word: string) => {
  const response = await fetch(`${PROXY}${ENDPOINT}${word}`)
  return (await response.json()) as ApiResponse
}

export const fetchWordsByKana = async (kana: string) => {
  const response = await fetch(
    `${PROXY}${ENDPOINT}${generateQueryString(kana)}`,
  )
  return (await response.json()) as ApiResponse
}
