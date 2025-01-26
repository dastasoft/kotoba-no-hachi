type MetaType = {
  status: number
}

type JapaneseType = {
  word: string
  reading: string
}

type SenseType = {
  english_definitions: string[]
  parts_of_speech: string[]
  links: string[]
  tags: string[]
  restrictions: string[]
  see_also: string[]
  antonyms: string[]
  source: string[]
  info: string[]
}

type AttributionType = {
  jmdict: boolean
  jmnedict: boolean
  dbpedia: boolean
}

type DataType = {
  slug: string
  is_common: boolean
  tags: string[]
  jlpt: string[]
  japanese: JapaneseType[]
  senses: SenseType[]
  attribution: AttributionType
}

export type ApiResponse = {
  meta: MetaType
  data: DataType[]
}
