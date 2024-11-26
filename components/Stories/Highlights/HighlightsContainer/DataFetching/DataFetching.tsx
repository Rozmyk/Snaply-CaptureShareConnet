import { useState, useEffect } from 'react'
import { getAllUserHighlights } from '../../../../../utils/highlights/getAllUserHighlights'
import { getHighlightById } from '../../../../../utils/highlights/getHighlightById'
import { SingleSavedStoryProps } from '../../../../../types'
interface DataFetchingProps {
	highlightId: string | null
	onDataFetched: (allHighlights: any) => void
	onFetchFailed: () => void
}

const DataFetching = ({ highlightId, onDataFetched, onFetchFailed }: DataFetchingProps) => {
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		if (!highlightId) {
			onFetchFailed()
		} else {
			const getData = async () => {
				const fetchedData = (await getHighlightById(highlightId)) as SingleSavedStoryProps
				if (fetchedData) {
					const allHighlights = (await getAllUserHighlights(fetchedData.addedBy)) as SingleSavedStoryProps[]
					if (allHighlights.length > 0) {
						allHighlights.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime())

						const centerHighlightIndex = allHighlights.findIndex(hl => hl.id === fetchedData.id)
						const [centerHighlight] = allHighlights.splice(centerHighlightIndex, 1)

						allHighlights.unshift(centerHighlight)

						onDataFetched(allHighlights)
						setIsFirstRender(false)
					}
				} else {
					onFetchFailed()
				}
			}
			if (isFirstRender) {
				getData()
			}
		}
	}, [highlightId, onDataFetched, onFetchFailed])

	return null
}

export default DataFetching
