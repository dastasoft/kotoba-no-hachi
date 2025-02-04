import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

import {
  type ApiResponse,
  type Dictionary,
  type KanjiDefinition,
} from '../types/dictionary.type'

interface Database {
  all: (query: string) => Promise<ApiResponse<Dictionary | KanjiDefinition>[]>
}

let db: Database | null = null

export async function openDb() {
  if (!db) {
    db = await open({
      filename: './data/JMdict_e.db',
      driver: sqlite3.Database,
    })
  }

  return db
}
