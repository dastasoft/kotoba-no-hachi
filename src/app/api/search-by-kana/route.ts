import { type NextRequest, NextResponse } from 'next/server'

import { openDb } from '~/lib/utils/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const kana = searchParams.get('kana')

  if (!kana || kana.length !== 1) {
    return NextResponse.json({ error: 'Invalid kana input' }, { status: 400 })
  }

  const db = await openDb()

  try {
    const items = await db.all(
      `SELECT * FROM words WHERE LENGTH(kana) = 7 AND kana LIKE '%${kana}%'`,
    )

    return NextResponse.json({ data: items })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
