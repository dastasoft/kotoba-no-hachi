export type Dictionary = {
  id: string
  kana: string
  kanji: string
  eng_translation: string
}

export type ApiResponse = {
  data: Dictionary[]
}
