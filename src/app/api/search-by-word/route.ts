import { type NextRequest, NextResponse } from 'next/server'

import { openDb } from '~/lib/utils/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const word = searchParams.get('word')

  if (!word) {
    return NextResponse.json({ error: 'Invalid word input' }, { status: 400 })
  }

  const query = `SELECT * FROM kana WHERE value = "${word}"`

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
