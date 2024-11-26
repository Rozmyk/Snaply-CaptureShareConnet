import { useState, useEffect } from 'react'
import { createStyles, getStylesRef } from '@mantine/core'
import SingleSavedStory from './SingleSavedStory/SIngleSavedSstory'
import AddNewHighlight from './AddNewHighlight/AddNewHighlight'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel } from '@mantine/carousel'
import { SingleSavedStoryProps } from '../../../types'
import { useSession } from 'next-auth/react'
import { getAllUserHighlights } from '../../../utils/highlights/getAllUserHighlights'
import StoriesLoading from './StoriesLoading/StoriesLoading'
interface SavedStoriesProps {
	isCurrentUser: boolean
	id: string
}
const useStyles = createStyles(() => ({
	controls: {
		ref: getStylesRef('controls'),
		transition: 'opacity 150ms ease',
		opacity: 0,
	},
	control: {
		'&[data-inactive]': {
			opacity: 0,
			cursor: 'default',
		},
	},

	root: {
		'&:hover': {
			[`& .${getStylesRef('controls')}`]: {
				opacity: 1,
			},
		},
	},
}))

const SavedStories = ({ isCurrentUser, id }: SavedStoriesProps) => {
	const isSmallScreen = useMediaQuery('(max-width: 775px)')
	const session = useSession()
	const userId = session?.data?.user?.id
	const { classes } = useStyles()
	const [savedStoriesData, setSavedStoriesData] = useState<SingleSavedStoryProps[] | null>(null)
	const [savedStoriesLoading, setSavedStoriesLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getAllUserHighlights(id)
			if (fetchedData) {
				setSavedStoriesData(fetchedData)
				setSavedStoriesLoading(false)
			} else {
				setSavedStoriesLoading(true)
			}
		}
		fetchData()
	}, [userId, id])
	return (
		<Carousel
			mt={isSmallScreen ? 'xs' : '50px'}
			mb={isSmallScreen ? 'xs' : '50px'}
			classNames={classes}
			slideSize='70%'
			align='start'
			slideGap='xl'>
			{isCurrentUser && (
				<Carousel.Slide size={85}>
					<AddNewHighlight />
				</Carousel.Slide>
			)}
			{!savedStoriesLoading ? (
				savedStoriesData &&
				savedStoriesData.length > 0 &&
				savedStoriesData.map(story => (
					<Carousel.Slide key={story.id} size={85}>
						<SingleSavedStory
							highlightId={story.id}
							storyImage={story.highlightGroupImage}
							storyName={story.highlightGroupName}
						/>
					</Carousel.Slide>
				))
			) : (
				<StoriesLoading />
			)}
		</Carousel>
	)
}

export default SavedStories
