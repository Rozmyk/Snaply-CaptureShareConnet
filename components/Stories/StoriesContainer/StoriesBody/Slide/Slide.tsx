import React from 'react'
import SingleStory from './SingleStory/SingleStory'
import { StackedCarouselSlideProps } from 'react-stacked-center-carousel'
interface updatedProps extends StackedCarouselSlideProps {
	slideWidth: number
}
export const Slide = React.memo(function Slide(props: updatedProps) {
	const { data, dataIndex, isCenterSlide, swipeTo, slideIndex, slideWidth } = props

	return (
		<div className='card-card' draggable={false}>
			<div className={`cover fill ${isCenterSlide ? 'off' : 'on'} `}>
				<div
					className='card-overlay fill'
					onClick={() => {
						if (!isCenterSlide) swipeTo(slideIndex)
					}}
				/>
			</div>
			<div className='detail fill' style={{ backgroundColor: 'transparent' }}>
				<SingleStory
					slideIndex={slideIndex}
					dataIndex={dataIndex}
					swipeTo={swipeTo}
					isCenterSlide={isCenterSlide}
					data={data}
					slideWidth={slideWidth}
				/>
			</div>
		</div>
	)
})
