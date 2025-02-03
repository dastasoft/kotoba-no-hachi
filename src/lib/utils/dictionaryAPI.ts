import {
  type ApiResponse,
  type Dictionary,
  type KanjiDefinition,
} from '../types/dictionary.type'

export type KanaMatchState = 'NO_MATCH' | 'MATCH' | 'INVALID_INPUT'

type MatchResult = {
  status: KanaMatchState
  data?: KanjiDefinition[]
}

export async function isMatch(
  inputWord: string,
  middleKana: string | undefined,
): Promise<MatchResult> {
  if (inputWord.length < 2 || !middleKana || !inputWord.includes(middleKana))
    return { status: 'INVALID_INPUT' }

  const { data } = await fetchWord(inputWord)
  if (data.length === 0) return { status: 'NO_MATCH' }

  const { data: kanjiAndDefition } = await fetchKanjiAndDefinition(inputWord)

  return {
    status: data.length > 0 ? 'MATCH' : 'NO_MATCH',
    data: kanjiAndDefition,
  }
}

const fetchWord = async (word: string | undefined) => {
  const response = await fetch(`/api/search-by-word?word=${word}`)
  return (await response.json()) as ApiResponse<Dictionary>
}

export const fetchWordsByKana = async (kana: string | undefined) => {
  const response = await fetch(`/api/search-by-kana?kana=${kana}`)
  return (await response.json()) as ApiResponse<Dictionary>
}

export const fetchKanjiAndDefinition = async (word: string | undefined) => {
  const response = await fetch(`/api/search-kanji-definition?word=${word}`)
  return (await response.json()) as ApiResponse<KanjiDefinition>
}
