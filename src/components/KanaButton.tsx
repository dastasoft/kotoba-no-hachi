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
            kana === middleKana ? 'bg-red-500' : 'bg-cyan-500'
          } transition-opacity hover:opacity-80`}
          key={`${kana}-${index}`}
        >
          <span className="text-2xl font-bold text-black">{kana}</span>
        </button>
      ))}
    </div>
  )
}

export default KanaButton
