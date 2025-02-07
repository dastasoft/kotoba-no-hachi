import { type NextRequest, NextResponse } from 'next/server'

import { openDb } from '~/lib/utils/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const word = searchParams.get('word')

  if (!word) {
    return NextResponse.json({ error: 'Invalid word input' }, { status: 400 })
  }

  const query = `SELECT 
      k.id AS kanji_id,
      k.value AS kanji, 
      d.id AS definition_id,
      d.value AS definition
      FROM 
        kana ka
      LEFT JOIN 
        kanji k ON ka.entry_id = k.entry_id
      JOIN 
        sense s ON ka.entry_id = s.entry_id
      JOIN 
        definition d ON s.id = d.sense_id
      WHERE 
        ka.value = '${word}'`

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
