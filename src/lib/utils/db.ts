import path from 'path'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

import {
  type ApiResponse,
  type Dictionary,
  type KanjiDefinition,
} from '../types/dictionary.type'

interface Database {
  all: (
    query: string,
    ...params: unknown[]
  ) => Promise<ApiResponse<Dictionary | KanjiDefinition>[]>
}

let db: Database | null = null

export async function openDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'public', 'JMdict_e.db')
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
  }

  return db
}
