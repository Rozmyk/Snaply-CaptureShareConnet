import { useEffect, useState, useRef } from 'react'

export const useScroll = () => {
	const [isUserAtBottom, setIsUserAtBottom] = useState(false)
	const boxRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			const boxElement = boxRef.current

			if (!boxElement) return

			const boxTop = boxElement.offsetTop
			const boxBottom = boxTop + boxElement.clientHeight
			const scrollY = window.scrollY
			const windowHeight = window.innerHeight
			const isAtBottom = scrollY + windowHeight >= boxBottom

			setIsUserAtBottom(isAtBottom)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return { isUserAtBottom, boxRef }
}
