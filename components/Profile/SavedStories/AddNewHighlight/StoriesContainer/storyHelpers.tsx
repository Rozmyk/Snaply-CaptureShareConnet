import { SetStateAction, Dispatch } from 'react'

export const selectSingleStory = (
	storyId: string,
	selectedStories: string[],
	setSelectedStories: Dispatch<SetStateAction<string[]>>
) => {
	console.log(selectedStories)
	const updatedArray = [...selectedStories, storyId]
	setSelectedStories(updatedArray)
}

export const deleteSingleStory = (
	storyId: string,
	selectedStories: string[],
	setSelectedStories: Dispatch<SetStateAction<string[]>>
) => {
	const updatedArray = selectedStories.filter(id => id !== storyId)
	setSelectedStories(updatedArray)
}
