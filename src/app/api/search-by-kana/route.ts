import { type NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const kana = searchParams.get('kana')

  if (!kana || kana.length !== 1) {
    return NextResponse.json({ error: 'Invalid kana input' }, { status: 400 })
  }

  const query = `SELECT * FROM kana WHERE LENGTH(value) = 7 AND value LIKE '%${kana}%'`

  try {
    const dbPath = path.join(process.cwd(), 'public', 'JMdict_e.db')
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    const items = await db.all(query)

    return NextResponse.json({ data: items })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
