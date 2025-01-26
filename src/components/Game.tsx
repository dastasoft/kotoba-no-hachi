'use client'

import { useState, useEffect } from 'react'
import { isMatch } from '~/lib/utils/generateKana'
import { useScore } from '~/hooks/useScore'

interface GameProps {
  kanaSet: string[] | undefined
  middleKana: string
  refreshKanaSet: () => Promise<void>
  loading: boolean
}

const Game = ({ kanaSet, middleKana, refreshKanaSet, loading }: GameProps) => {
  const [word, setWord] = useState<string>('')
  const { score, increment, reset: resetScore } = useScore()

  const refresh = () => {
    refreshKanaSet().catch((error) =>
      console.error('Error refreshing kana:', error),
    )
    clean()
    resetScore()
  }

  const loadKanaSet = () => {
    refreshKanaSet().catch((error) =>
      console.error('Error fetching kana:', error),
    )
  }

  const addKana = (kana: string) => () => {
    setWord((prev) => prev + kana)
  }

  const clean = () => {
    setWord('')
  }

  const submit = async () => {
    const matchState = await isMatch(word, middleKana)
    switch (matchState) {
      case 'MATCH':
        alert('Correct!')
        increment(word)
        clean()
        break
      case 'NO_MATCH':
        alert('Incorrect!')
        break
      case 'INVALID_INPUT':
        alert('Invalid input!')
        break
      default:
        break
    }
  }

  useEffect(loadKanaSet, [refreshKanaSet])

  return (
    <div>
      <h1>言葉の蜂</h1>
      <p>Score: {score}</p>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <span>Kana Set: </span>
          {kanaSet?.map((kana, index) => (
            <button
              onClick={addKana(kana)}
              className={`ml-4 border border-cyan-800 p-4 ${kana === middleKana ? 'bg-red-500' : 'bg-cyan-500'}`}
              key={`${kana}-${index}`}
            >
              {kana}
            </button>
          ))}
          <p>Word: {word}</p>
          <button onClick={refresh}>Refresh</button>
          <button onClick={clean}>Clean</button>
          <button onClick={submit}>Submit</button>
        </>
      )}
    </div>
  )
}

export default Game
