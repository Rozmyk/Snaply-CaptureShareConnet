'use client'
import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { useElementSize } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import { useMantineColorScheme, Flex } from '@mantine/core'
import useFetchStories from './useFetchStories'
import { selectSingleStory, deleteSingleStory } from './storyHelpers'
import Loading from './Loading/Loading'
import NoStoriesMessage from './NoStoriesMessage/NoStoriesMessage'
import StoriesGrid from './StoriesGrid/StoriesGrid'
import CustomButtonTransparent from '../../../../CustomButton/CustomButtonTransparent/CustomButtonTransparent'
import { SingleStoryProps } from '../../../../../types'

interface StoriesContainerProps {
	setCurrentStep: Dispatch<SetStateAction<'setName' | 'selectStories' | 'setTitleIcon'>>
	setLastSelectedStory: Dispatch<SetStateAction<SingleStoryProps | null>>
	setSelectedStories: Dispatch<SetStateAction<string[]>>
	selectedStories: string[]
}
const StoriesContainer = ({
	setCurrentStep,
	setLastSelectedStory,
	setSelectedStories,
	selectedStories,
}: StoriesContainerProps) => {
	const { ref, width } = useElementSize()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const session = useSession()
	const userId = session?.data?.user?.id
	const [singleStorySize, setSingleStorySize] = useState(0)

	const { stories, loading, noStoriesToLoad } = useFetchStories(userId ?? '')

	useEffect(() => {
		setSingleStorySize(width / 3 - 5)
	}, [width])

	return (
		<>
			{loading ? (
				<Loading />
			) : noStoriesToLoad ? (
				<NoStoriesMessage />
			) : (
				<div ref={ref} style={{ width: '100%' }}>
					<StoriesGrid
						stories={stories}
						singleStorySize={singleStorySize}
						selectedStories={selectedStories}
						setLastSelectedStory={setLastSelectedStory}
						selectSingleStory={storyId => selectSingleStory(storyId, selectedStories, setSelectedStories)}
						deleteSingleStory={storyId => deleteSingleStory(storyId, selectedStories, setSelectedStories)}
					/>
					<Flex p='xs' sx={{ borderTop: `1px solid ${dark ? '#363636' : '#dbdbdb'}` }}>
						<CustomButtonTransparent
							onClick={() => setCurrentStep('setTitleIcon')}
							disabled={selectedStories.length < 0 || noStoriesToLoad}
							fullWidth>
							Next
						</CustomButtonTransparent>
					</Flex>
				</div>
			)}
		</>
	)
}

export default StoriesContainer
