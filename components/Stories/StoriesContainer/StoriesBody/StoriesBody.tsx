import { Slide } from './Slide/Slide'
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel'
import React from 'react'
interface StoriesBodyProps {
	storiesData: any
	storiesDisplayCount: number
	scales: number[]
}
const StoriesBody = ({ storiesData, storiesDisplayCount, scales }: StoriesBodyProps) => {
	const ref = React.useRef<any>(StackedCarousel)
	return (
		<div className='card' style={{ width: '100%' }}>
			<div style={{ width: '100%', position: 'relative' }}>
				{storiesData && (
					<ResponsiveContainer
						carouselRef={ref}
						render={(width, carouselRef) => {
							return (
								<StackedCarousel
									ref={carouselRef}
									slideComponent={Slide}
									slideWidth={300}
									carouselWidth={width}
									data={storiesData}
									maxVisibleSlide={storiesDisplayCount}
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

export default StoriesBody
3
