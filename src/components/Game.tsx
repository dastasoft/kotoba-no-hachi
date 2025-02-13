'use client'

import { useState } from 'react'

import { useGenerateKana } from '~/hooks/useGenerateKana'
import { useScore } from '~/hooks/useScore'
import { useWord } from '~/hooks/useWord'
import { type KanjiDefinition } from '~/lib/types/dictionary.type'
import { isMatch } from '~/lib/utils/dictionaryAPI'

import KanaGrid from './KanaGrid'
import TranslationsTable from './TranslationsTable'

const Game = () => {
  const { word, addKana, clean } = useWord()
  const { score, increment, reset: resetScore } = useScore()
  const { kanaSet, middleKana, refreshKanaSet, loading } = useGenerateKana()
  const [translations, setTranslations] = useState<
    KanjiDefinition[] | undefined
  >(undefined)

  const refresh = () => {
    void refreshKanaSet()
    clean()
    resetScore()
    setTranslations(undefined)
  }

  const submit = async () => {
    const { status: matchState, data: details } = await isMatch(
      word,
      middleKana,
    )

    switch (matchState) {
      case 'MATCH':
        alert('Correct!!')
        setTranslations(details)
        increment(word)
        clean()
        break
      case 'NO_MATCH':
        alert('Incorrect!')
        break
      case 'INVALID_INPUT':
      default:
        alert('Invalid input!')
        break
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 p-4">
      <p className="text-lg text-gray-700">Score: {score}</p>
      <div className="flex w-full max-w-md flex-1 flex-col">
        {loading ? (
          <span className="text-lg text-gray-500">Loading...</span>
        ) : (
          <>
            <p className="h-6 text-center text-xl font-medium text-gray-700">
              {word}
            </p>
            <div className="mb-3 mt-12 flex-1">
              <KanaGrid
                kanaSet={kanaSet}
                addKana={addKana}
                middleKana={middleKana}
              />
            </div>
            <div className="mt-4 flex justify-between space-x-4">
              <button
                onClick={clean}
                className="rounded-full border bg-white px-4 py-2 text-gray-600 shadow-md hover:bg-gray-100"
              >
                Clean
              </button>
              <button
                onClick={refresh}
                className="rounded-full border bg-white p-3 text-gray-600 shadow-md hover:bg-gray-100"
              >
                Refresh
              </button>
              <button
                onClick={submit}
                className="rounded-full border bg-white px-4 py-2 text-gray-600 shadow-md hover:bg-gray-100"
              >
                Submit
              </button>
            </div>
            <TranslationsTable translations={translations} />
          </>
        )}
      </div>
    </div>
  )
}

export default Game
