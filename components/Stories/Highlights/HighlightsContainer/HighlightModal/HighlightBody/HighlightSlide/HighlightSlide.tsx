import React from 'react'
import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import SingleHighlight from './SingleHighlight/SingleHighlight'
import { StackedCarouselSlideProps } from 'react-stacked-center-carousel'

type QueryParams = Record<string, string>

export const HighlightSlide = React.memo(function HighlightSlide(props: StackedCarouselSlideProps) {
	const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(newParams: QueryParams) => {
			const params = new URLSearchParams(searchParams.toString())

			Object.keys(newParams).forEach(key => {
				params.set(key, newParams[key])
			})

			return params.toString()
		},
		[searchParams]
	)
	const handleRedirect = (id: string) => {
		const newQueryParams = {
			id: id,
		}
		router.push(pathname + '?' + createQueryString(newQueryParams))
	}
	return (
		<div className='card-card' draggable={false}>
			<div className={`cover fill ${isCenterSlide ? 'off' : 'on'}`}>
				<div
					className='card-overlay fill'
					onClick={() => {
						if (!isCenterSlide) swipeTo(slideIndex)
					}}
				/>
			</div>
			<div className='detail fill' style={{ backgroundColor: 'transparent' }}>
				<SingleHighlight
					slideIndex={slideIndex}
					dataIndex={dataIndex}
					swipeTo={swipeTo}
					isCenterSlide={isCenterSlide}
					data={data}
					handleRedirect={handleRedirect}
				/>
			</div>
		</div>
	)
})
