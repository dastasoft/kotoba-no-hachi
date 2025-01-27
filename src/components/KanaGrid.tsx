import KanaButton from './KanaButton'

type KanaSetProps = {
  kanaSet: string[] | undefined
  addKana: (kana: string) => () => void
  middleKana: string | undefined
}

const KanaGrid = ({ kanaSet, addKana, middleKana }: KanaSetProps) => {
  return (
    <div className="flex flex-col items-center">
      <KanaButton
        kanaSet={kanaSet?.slice(0, 2)}
        onClick={addKana}
        middleKana={middleKana}
      />
      <KanaButton
        kanaSet={kanaSet?.slice(2, 5)}
        onClick={addKana}
        middleKana={middleKana}
      />
      <KanaButton
        kanaSet={kanaSet?.slice(5, 7)}
        onClick={addKana}
        middleKana={middleKana}
      />
    </div>
  )
}

export default KanaGrid
