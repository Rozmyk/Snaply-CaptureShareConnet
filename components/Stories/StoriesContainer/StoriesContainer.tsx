import { useStories } from '../../../context/StoriesContext'
import { useState, useEffect } from 'react'
import React from 'react'
import './Carousel.css'
import { Modal } from '@mantine/core'
import { useRouter } from 'next/navigation'
import ErrorPage from '../../ErrorPage/ErrorPage'
import StoriesHeader from './StoriesHeader/StoriesHeader'
import StoriesLoading from './StoriesLoading/StoriesLoading'
import { fetchStoriesByUsername } from './fetchStoriesByUsername '
import StoriesBody from './StoriesBody/StoriesBody'
import { UpdatedSingleStoryProps } from '../../../types'
interface StoriesContainerProps {
	username: string
}
const StoriesContainer = ({ username }: StoriesContainerProps) => {
	const { stories, storiesLoading } = useStories()
	const [storiesData, setStoriesData] = useState<UpdatedSingleStoryProps[] | null>(null)
	const [storiesDisplayCount, setStoriesDisplayCount] = useState(1)
	const [scales, setScales] = useState([1])
	const [error, setError] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (stories) {
			if (stories.length < 2) {
				setStoriesDisplayCount(1)
			} else if (stories.length >= 2 && stories.length < 5) {
				setStoriesDisplayCount(3)
			} else if (stories.length >= 5) {
				setStoriesDisplayCount(5)
			}
		}
	}, [stories])
	useEffect(() => {
		const newScales = [2]
		for (let i = 1; i < Math.ceil((storiesDisplayCount + 3) / 2); i++) {
			newScales.push(0.4)
		}
		setScales(newScales)
	}, [storiesDisplayCount])
	useEffect(() => {
		if (username && stories && stories.length > 0) {
			fetchStoriesByUsername(username, stories, setStoriesData, setError)
		}
	}, [storiesLoading, stories, username])

	return error ? (
		<ErrorPage />
	) : (
		<Modal.Root
			fullScreen
			opened={true}
			onClose={() => {
				router.push('/')
			}}>
			<Modal.Overlay />
			<Modal.Content sx={{ backgroundColor: '#1b1a1b' }}>
				<StoriesHeader
					onClose={() => {
						router.push('/')
					}}
				/>

				<Modal.Body
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}>
					{storiesLoading ? (
						<StoriesLoading />
					) : (
						storiesData && (
							<StoriesBody storiesDisplayCount={storiesDisplayCount} storiesData={storiesData} scales={scales} />
						)
					)}
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}

export default StoriesContainer
