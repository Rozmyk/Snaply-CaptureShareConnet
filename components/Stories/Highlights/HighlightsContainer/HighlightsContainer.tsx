import { useState } from 'react'
import DataFetching from './DataFetching/DataFetching'
import HighlightDisplaySettings from './HighlightDisplaySettings/HighlightDisplaySettings'
import HighlightModal from './HighlightModal/HighlightModal'
import { SingleSavedStoryProps } from '../../../../types'

const HighlightsContainer = ({ highlightId }: { highlightId: string | null }) => {
	const [allHighlightsData, setAllHighlightsData] = useState<SingleSavedStoryProps[] | null>(null)
	const [highlightLoading, setHighlightLoading] = useState(true)
	const [failedHighlightId, setFailedHighlightId] = useState(false)
	const [highlightDisplayCount, setHighlightDisplayCount] = useState(1)
	const [scales, setScales] = useState([1])

	const handleDataFetched = (data: any) => {
		setAllHighlightsData(data)
		setHighlightLoading(false)
	}

	const handleFetchFailed = () => {
		setFailedHighlightId(true)
		setHighlightLoading(true)
	}

	const handleSettingsChange = (displayCount: number, newScales: number[]) => {
		setHighlightDisplayCount(displayCount)
		setScales(newScales)
	}

	return (
		<>
			<DataFetching highlightId={highlightId} onDataFetched={handleDataFetched} onFetchFailed={handleFetchFailed} />

			<>
				<HighlightDisplaySettings
					allHighlightsData={allHighlightsData}
					highlightLoading={highlightLoading}
					onSettingsChange={handleSettingsChange}
				/>
				<HighlightModal
					highlightLoading={highlightLoading}
					allHighlightsData={allHighlightsData}
					scales={scales}
					highlightDisplayCount={highlightDisplayCount}
					failedHighlightId={failedHighlightId}
				/>
			</>
		</>
	)
}

export default HighlightsContainer
