import { Dispatch, SetStateAction } from 'react'
import { UpdatedSingleStoryProps } from '../../../types'

export const fetchStoriesByUsername = (
	username: string,
	stories: UpdatedSingleStoryProps[],
	setStoriesData: Dispatch<SetStateAction<UpdatedSingleStoryProps[] | null>>,
	setError: Dispatch<SetStateAction<boolean>>
) => {
	if (username) {
		const foundStory = stories.find(story => story.user.username === username)
		if (foundStory) {
			const remainingStories = stories.filter(story => story.user.username !== username)
			const updatedStories = [foundStory, ...remainingStories]
			setStoriesData(updatedStories)
			setError(false)
		} else {
			setError(true)
		}
	}
}
