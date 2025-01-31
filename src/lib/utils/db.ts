import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

import { type ApiResponse } from '../types/dictionary.type'

interface Database {
  all: (query: string) => Promise<ApiResponse[]>
}

let db: Database | null = null

export async function openDb() {
  if (!db) {
    db = await open({
      filename: './data/jmdict.db',
      driver: sqlite3.Database,
    })
  }

  return db
}
