'use client'

import Game from '~/components/Game'
import { useGenerateKana } from '~/hooks/useGenerateKana'

export default function HomePage() {
  const { kanaSet, middleKana, refreshKanaSet, loading } = useGenerateKana()

  return (
    <main>
      <Game
        kanaSet={kanaSet}
        middleKana={middleKana}
        refreshKanaSet={refreshKanaSet}
        loading={loading}
      />
    </main>
  )
}
