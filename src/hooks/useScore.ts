import { useState } from 'react'

const BONUS_POINTS = 10

export const useScore = () => {
  const [score, setScore] = useState<number>(0)

  const increment = (word: string) => {
    switch (word.length) {
      case 2:
        setScore((prev) => prev + 1)
        break
      case 3:
        setScore((prev) => prev + 2)
        break
      case 4:
        setScore((prev) => prev + 3)
        break
      case 5:
        setScore((prev) => prev + word.length)
        break
      case 7:
        // FIXME: This does not check if every kana has been used, only the lenght
        setScore((prev) => prev + length + BONUS_POINTS)
        break
      default:
        break
    }
    setScore((prev) => prev + 1)
  }

  const reset = () => {
    setScore(0)
  }

  return { score, increment, reset }
}
