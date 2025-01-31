import { type ApiResponse, type Dictionary } from '../types/dictionary.type'

export type KanaMatchState = 'NO_MATCH' | 'MATCH' | 'INVALID_INPUT'

type MatchResult = {
  status: KanaMatchState
  data?: Dictionary[]
}

export async function isMatch(
  inputWord: string,
  middleKana: string | undefined,
): Promise<MatchResult> {
  if (inputWord.length < 2 || !middleKana || !inputWord.includes(middleKana))
    return { status: 'INVALID_INPUT' }

  const { data } = await fetchWord(inputWord)

  return { status: data.length > 0 ? 'MATCH' : 'NO_MATCH', data }
}

const fetchWord = async (word: string | undefined) => {
  const response = await fetch(`/api/search-by-word?word=${word}`)
  return (await response.json()) as ApiResponse
}

export const fetchWordsByKana = async (kana: string | undefined) => {
  const response = await fetch(`/api/search-by-kana?kana=${kana}`)
  return (await response.json()) as ApiResponse
}
