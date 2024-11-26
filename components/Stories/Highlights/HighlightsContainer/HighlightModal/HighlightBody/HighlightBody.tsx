import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel'
import { HighlightSlide } from './HighlightSlide/HighlightSlide'
import React from 'react'
import { SingleSavedStoryProps } from '../../../../../../types'
import { useMediaQuery } from '@mantine/hooks'

import HighlightBodyMobile from './HighlightBodyMobile/HighlightBodyMobile'
interface HighlightBodyProps {
	scales: number[]
	highlightDisplayCount: number
	allHighlightsData: SingleSavedStoryProps[]
}

const HighlightBody = ({ allHighlightsData, scales, highlightDisplayCount }: HighlightBodyProps) => {
	const ref = React.useRef<any>(StackedCarousel)
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return isSmallScreen ? (
		<HighlightBodyMobile allHighlightsData={allHighlightsData} />
	) : (
		<div className='card' style={{ maxWidth: '100vw', overflow: 'hidden' }}>
			<div style={{ width: '100vw', position: 'relative' }}>
				{allHighlightsData && (
					<ResponsiveContainer
						carouselRef={ref}
						render={(width, carouselRef) => {
							return (
								<StackedCarousel
									ref={carouselRef}
									slideComponent={HighlightSlide}
									slideWidth={300}
									carouselWidth={width}
									data={allHighlightsData}
									maxVisibleSlide={highlightDisplayCount}
									disableSwipe
									customScales={scales}
									transitionTime={450}
								/>
							)
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default HighlightBody
