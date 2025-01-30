import { type ApiResponse } from '../types/dictionary.type'

const WILDCARD = '%3F'

export type KanaMatchState = 'NO_MATCH' | 'MATCH' | 'INVALID_INPUT'

export type Detail = {
  slug: string
  translations: {
    english: string[] | undefined
  }
}

type MatchResult = {
  status: KanaMatchState
  details?: Detail[]
}

const generateQueryString = (middleKana: string | undefined): string => {
  const placeholders = Array(7).fill(WILDCARD)
  const randomIndex = Math.floor(Math.random() * placeholders.length)

  placeholders[randomIndex] = middleKana
  const queryString = placeholders.join('')

  return `${queryString}`
}

export async function isMatch(
  inputWord: string,
  middleKana: string | undefined,
): Promise<MatchResult> {
  if (inputWord.length < 2 || !middleKana || !inputWord.includes(middleKana))
    return { status: 'INVALID_INPUT' }

  const response = await fetchWord(inputWord)
  const details = response.data.map(({ slug, senses }) => ({
    slug,
    translations: { english: senses[0]?.english_definitions },
  }))

  return { status: response.data.length > 0 ? 'MATCH' : 'NO_MATCH', details }
}

export const fetchWord = async (word: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROXY}${process.env.NEXT_PUBLIC_ENDPOINT}"${word}"`,
  )
  return (await response.json()) as ApiResponse
}

export const fetchWordsByKana = async (kana: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROXY}${process.env.NEXT_PUBLIC_ENDPOINT}${generateQueryString(kana)}`,
  )
  return (await response.json()) as ApiResponse
}
