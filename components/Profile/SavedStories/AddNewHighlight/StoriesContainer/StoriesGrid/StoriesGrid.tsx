import { SimpleGrid } from '@mantine/core'
import SingleStory from '../SingleStory/SingleStory'
import { SingleStoryProps } from '../../../../../../types'
import { Dispatch, SetStateAction } from 'react'

interface StoriesGridProps {
	stories: SingleStoryProps[]
	singleStorySize: number
	selectedStories: string[]
	setLastSelectedStory: Dispatch<SetStateAction<SingleStoryProps | null>>
	selectSingleStory: (storyId: string) => void
	deleteSingleStory: (storyId: string) => void
}

const StoriesGrid = ({
	stories,
	singleStorySize,
	selectedStories,
	setLastSelectedStory,
	selectSingleStory,
	deleteSingleStory,
}: StoriesGridProps) => (
	<SimpleGrid w={'100%'} spacing='xs' cols={3}>
		{stories.map(story => (
			<SingleStory
				key={story.id}
				storySize={singleStorySize}
				{...story}
				onClick={() => {
					const isSelected = selectedStories.some(selectedStory => selectedStory === story.id)
					if (isSelected) {
						deleteSingleStory(story.id)
						setLastSelectedStory(null)
					} else {
						setLastSelectedStory(story)
						selectSingleStory(story.id)
					}
				}}
			/>
		))}
	</SimpleGrid>
)

export default StoriesGrid
