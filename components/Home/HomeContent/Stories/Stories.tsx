'use client'
import { useState, useEffect } from 'react'
import { createStyles, getStylesRef } from '@mantine/core'
import AddStory from './AddStory/AddStory'
import { Carousel } from '@mantine/carousel'
import StoriesLoading from './StoriesLoading/StoriesLoading'
import StoryIcon from './StoryIcon/StoryIcon'
import { useStories } from '../../../../context/StoriesContext'
import { useSession } from 'next-auth/react'
import { UpdatedSingleStoryProps } from '../../../../types'
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
const Stories = () => {
	const { stories, storiesLoading, noStories } = useStories()
	const [filteredStories, setFilteredStories] = useState<UpdatedSingleStoryProps[] | null>(null)
	const session = useSession()
	const userId = session?.data?.user?.id
	const { classes } = useStyles()
	useEffect(() => {
		if (!storiesLoading && stories && stories.length > 0) {
			const viewedStories: UpdatedSingleStoryProps[] = []
			const notViewedStories: UpdatedSingleStoryProps[] = []

			userId &&
				stories.forEach(story => {
					if (story.stories[0].viewedBy.includes(userId)) {
						viewedStories.unshift(story)
					} else {
						notViewedStories.push(story)
					}
				})

			setFilteredStories([...viewedStories, ...notViewedStories])
		}
	}, [stories, storiesLoading, userId])
	return (
		<>
			<Carousel classNames={classes} slideSize='70%' align='start' slideGap='xs'>
				<Carousel.Slide size={85}>
					<AddStory />
				</Carousel.Slide>
				{!noStories && storiesLoading ? (
					<StoriesLoading />
				) : (
					filteredStories &&
					filteredStories.length > 0 &&
					filteredStories.map(story => {
						return (
							<Carousel.Slide key={story.userId} size={85}>
								<StoryIcon userImage={story.user.image} username={story.user.username} lastStory={story.stories[0]} />
							</Carousel.Slide>
						)
					})
				)}
			</Carousel>
		</>
	)
}

export default Stories
