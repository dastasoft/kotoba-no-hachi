import { type KanjiDefinition } from '~/lib/types/dictionary.type'

const TranslationsTable = ({
  translations,
}: {
  translations: KanjiDefinition[] | undefined
}) => {
  return (
    <div className="mt-4 w-full max-w-md flex-1">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 text-left text-gray-700">
              Kanji
            </th>
            <th className="border-b-2 border-gray-300 py-2 text-left text-gray-700">
              Meaning
            </th>
          </tr>
        </thead>
        <tbody>
          {translations?.map(
            ({ kanji_id, kanji, definition_id, definition }) => (
              <tr
                key={`${kanji_id}-${definition_id}`}
                className="hover:bg-gray-100"
              >
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">
                  {kanji}
                </td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">
                  {definition}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TranslationsTable
