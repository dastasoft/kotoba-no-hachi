export type Dictionary = {
  entry_id: string
  id: string
  no_kanji: string
  value: string
}

export type KanjiDefinition = {
  kanji_id: string
  kanji: string
  definition_id: string
  definition: string
}

export type ApiResponse<T> = {
  data: T[]
}
