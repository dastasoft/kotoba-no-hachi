import { type NextRequest, NextResponse } from 'next/server'

import { openDb } from '~/lib/utils/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const kana = searchParams.get('kana')

  if (!kana || kana.length !== 1) {
    return NextResponse.json({ error: 'Invalid kana input' }, { status: 400 })
  }

  const query = `SELECT * FROM kana WHERE LENGTH(value) = 7 AND value LIKE '%${kana}%' LIMIT 10`

  try {
    const db = await openDb()
    const items = await db.all(query)

    return NextResponse.json({ data: items })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
