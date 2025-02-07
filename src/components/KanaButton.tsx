type KanaButtonProps = {
  kanaSet: string[] | undefined
  onClick: (kana: string) => () => void
  middleKana: string | undefined
}

const KanaButton = ({ kanaSet, onClick, middleKana }: KanaButtonProps) => {
  return (
    <div className="-my-3 flex">
      {kanaSet?.map((kana, index) => (
        <button
          onClick={onClick(kana)}
          className={`clip-hexagon relative mx-0.5 flex h-28 w-28 items-center justify-center ${
            kana === middleKana
              ? 'bg-cyan-500 hover:bg-cyan-600'
              : 'bg-amber-300 hover:bg-amber-400'
          } transition-opacity`}
          key={`${kana}-${index}`}
        >
          <span className="text-2xl font-bold text-black">{kana}</span>
        </button>
      ))}
    </div>
  )
}

export default KanaButton
