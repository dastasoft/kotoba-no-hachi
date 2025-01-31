import { type NextRequest, NextResponse } from 'next/server'

import { openDb } from '~/lib/utils/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const word = searchParams.get('word')

  if (!word) {
    return NextResponse.json({ error: 'Invalid word input' }, { status: 400 })
  }

  const db = await openDb()

  try {
    const items = await db.all(`SELECT * FROM words WHERE kana = "${word}"`)

    return NextResponse.json({ data: items })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
