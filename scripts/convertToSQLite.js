import fs from 'fs-extra'
import sqlite3 from 'sqlite3'

const dbFile = '../data/jmdict.db'
const jsonFile = '../data/jmdict-eng-3.6.1.json'

const { words: data } = fs.readJsonSync(jsonFile)

const db = new sqlite3.Database(dbFile)
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS words')
  db.run(
    'CREATE TABLE words (id INTEGER PRIMARY KEY, kana TEXT, kanji TEXT, eng_translation TEXT)',
  )

  const stmt = db.prepare(
    'INSERT INTO words (id, kana, kanji, eng_translation) VALUES (?, ?, ?, ?)',
  )

  data.forEach(({ id, kana, kanji, sense }) => {
    const _kana = kana[0]?.text || ''
    const _kanji = kanji[0]?.text || ''
    const eng_translation = sense[0]?.gloss[0]?.text || ''

    console.log('Inserting: ', id, _kana, _kanji, eng_translation)
    stmt.run(id, _kana, _kanji, eng_translation)
  })

  stmt.finalize()
  console.log('Database created successfully!')
})

db.close()
