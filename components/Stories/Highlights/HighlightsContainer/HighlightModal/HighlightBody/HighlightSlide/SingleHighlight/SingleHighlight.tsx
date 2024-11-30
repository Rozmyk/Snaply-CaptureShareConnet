'use client'
import { useState, useEffect } from 'react'
import Stories from 'react-insta-stories'
import { SingleStoryProps, UserProps, SingleSavedStoryProps } from '../../../../../../../../types'
import { fetchUserData } from '../../../../../../../../utils/user/fetchUserData'
import getStoryById from '../../../../../../../../utils/stories/getStoryById'
import { Timestamp } from 'firebase-admin/firestore'
import MiniHighlight from './MiniHighlight/MiniHIghlight'
import CustomHighlight from './CustomHighlight/CustomHighlight'

interface updatedStoryProps {
	duration: number
	url: string
	user: UserProps
	createdAt: Timestamp
	id: string
	content: (props: CustomHighlightProps) => JSX.Element
}
interface CustomHighlightProps {
	isPaused: boolean
	action: (action: string) => void
	story: updatedStoryProps
}
interface SingleHighlightProps {
	isCenterSlide: boolean
	data: SingleSavedStoryProps[]
	dataIndex: number
	slideIndex: number
	swipeTo: (index: number) => void
	handleRedirect: (id: string) => void
}

const SingleHighlight = ({
	isCenterSlide,
	data,
	dataIndex,
	slideIndex,
	swipeTo,
	handleRedirect,
}: SingleHighlightProps) => {
	const currentHighlight: SingleSavedStoryProps = data[dataIndex]
	const [updatedHighlights, setUpdatedHighlights] = useState<any>(null)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [userLoading, setUserLoading] = useState(true)
	const [highlightsLoading, setHighlightsLoading] = useState(true)

	useEffect(() => {
		const getUserData = async () => {
			const fetchedData = await fetchUserData(currentHighlight.addedBy)
			if (fetchedData) {
				setUserData(fetchedData)
				setUserLoading(false)
			}
		}
		getUserData()
	}, [currentHighlight.addedBy])

	useEffect(() => {
		const updateHighlights = async (highlightData: string[]) => {
			const arr: updatedStoryProps[] = []
			for (const id of highlightData) {
				const story: SingleStoryProps | null | undefined = await getStoryById(currentHighlight.addedBy, id)

				if (story && story.image && story.createdAt && story.id && userData) {
					const newHighlights = {
						duration: 6000,
						url: story.image,
						user: userData,
						createdAt: story.createdAt,
						id: story.id,
						content: (props: CustomHighlightProps) => <CustomHighlight {...props} />,
					}

					if (newHighlights) {
						arr.push(newHighlights)
					}
				}
			}
			setUpdatedHighlights(arr)
			setHighlightsLoading(false)
		}
		const fetchData = async () => {
			if (currentHighlight.storyIds && !userLoading) {
				updateHighlights(currentHighlight.storyIds)
			}
		}
		fetchData()
	}, [userLoading, currentHighlight.storyIds, currentHighlight.addedBy, userData])

	return (
		<>
			{isCenterSlide
				? !highlightsLoading &&
				  !userLoading &&
				  updatedHighlights &&
				  updatedHighlights.length > 0 && (
						<Stories
							height='100%'
							storyContainerStyles={{ maxWidth: 300 }}
							onStoryStart={() => {
								handleRedirect(data[dataIndex].id)
							}}
							stories={updatedHighlights}
							onAllStoriesEnd={() => {
								swipeTo(slideIndex + 1)
							}}
						/>
				  )
				: currentHighlight &&
				  !highlightsLoading &&
				  !userLoading && (
						<MiniHighlight
							createdAt={currentHighlight.createdAt}
							highlightName={currentHighlight.highlightGroupName}
							imageSrc={currentHighlight.highlightGroupImage}
						/>
				  )}
		</>
	)
}

export default SingleHighlight
