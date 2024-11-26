import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mantine/hooks'

interface HighlightDisplaySettingsProps {
	allHighlightsData: any
	highlightLoading: boolean
	onSettingsChange: (displayCount: number, scales: number[]) => void
}

const HighlightDisplaySettings = ({
	allHighlightsData,
	highlightLoading,
	onSettingsChange,
}: HighlightDisplaySettingsProps) => {
	const [highlightDisplayCount, setHighlightDisplayCount] = useState(1)
	const isSmallScreen = useMediaQuery('(max-width: 720px)')
	const isMediumScreen = useMediaQuery('(max-width: 1250px)')

	useEffect(() => {
		const setUpDisplayCount = (data: any) => {
			if (isSmallScreen) {
				setHighlightDisplayCount(1)
			} else {
				if (data.length < 2) {
					setHighlightDisplayCount(1)
				} else if (data.length >= 2 && data.length < 5) {
					setHighlightDisplayCount(3)
				} else if (data.length >= 5) {
					setHighlightDisplayCount(5)
				}
			}
		}
		if (!highlightLoading && allHighlightsData.length > 0) {
			setUpDisplayCount(allHighlightsData)
		}
	}, [allHighlightsData, highlightLoading, isSmallScreen])

	useEffect(() => {
		let newScales = [2]
		if (isSmallScreen) {
			newScales = [2, 0.4]
		} else {
			if (!highlightLoading && allHighlightsData.length > 0) {
				for (let i = 1; i < Math.ceil((highlightDisplayCount + 3) / 2); i++) {
					if (!isMediumScreen) {
						newScales.push(0.55)
					} else {
						newScales.push(0.4)
					}
				}
			}
		}
		onSettingsChange(highlightDisplayCount, newScales)
	}, [highlightDisplayCount, highlightLoading, isSmallScreen, allHighlightsData])

	return null
}

export default HighlightDisplaySettings
