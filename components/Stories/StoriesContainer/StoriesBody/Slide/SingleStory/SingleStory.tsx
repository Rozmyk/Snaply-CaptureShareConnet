'use client'
import { useState, useEffect, useCallback } from 'react'
import Stories from 'react-insta-stories'
import MiniStory from './MiniStory/MiniStory'
import CustomStory from './CustomStory/CustomStory'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SingleStoryProps, UserProps } from '../../../../../../types'
import { changeStoryViewedState } from '../../../changeStoryViewedState'

import { Timestamp } from 'firebase-admin/firestore'
interface SingleDataProps {
	userId: string
	user: UserProps
	stories: SingleStoryProps[]
}
interface storyProps {
	isCenterSlide: boolean
	slideWidth: number
	data: SingleDataProps[]
	dataIndex: number
	slideIndex: number
	swipeTo: (index: number) => void
}
interface updatedStoryProps {
	isPaused: boolean
	action: (action: string) => void
	width: number | string
	closeButtonAction: () => void
	story: SingleUpdateStoryProps
}
interface SingleUpdateStoryProps {
	duration: number
	url: string
	user: UserProps
	createdAt: Timestamp
	id: string
	viewedBy: string[]
	width: number | string
	content: (props: updatedStoryProps) => JSX.Element
}
type QueryParams = {
	[key: string]: string
}
const SingleStory = ({ isCenterSlide, slideWidth, data, dataIndex, slideIndex, swipeTo }: storyProps) => {
	const [storyData, setStoryData] = useState<SingleStoryProps[] | null>(null)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [updatedStories, setUpdatedStories] = useState<SingleUpdateStoryProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	const pathname = usePathname()
	const searchParams = useSearchParams()
	useEffect(() => {
		if (data && data[dataIndex]) {
			setStoryData(data[dataIndex].stories)
			setUserData(data[dataIndex].user)
			setLoading(false)
		}
	}, [data, dataIndex])
	const handleRedirect = (username: string, storyId: string) => {
		const newQueryParams = {
			username: username,
		}
		// router.push(pathname + '?' + createQueryString(newQueryParams))
	}
	const updateViewedState = async (userId: string, storyId: string) => {
		if (userData) {
			await changeStoryViewedState(userData.id, storyId, userId)
		}
	}
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
	useEffect(() => {
		if (data && data[dataIndex] && userData) {
			const currentData = data[dataIndex]
			const stories = currentData?.stories

			const newStories: SingleUpdateStoryProps[] = stories.map((story: SingleStoryProps) => ({
				duration: 6000,
				url: story.image,
				user: userData,
				createdAt: story.createdAt,
				id: story.id,
				viewedBy: story.viewedBy,
				width: 300,
				content: (props: updatedStoryProps) => <CustomStory {...props} />,
			}))

			setUpdatedStories(newStories)
		}
	}, [data, dataIndex, userData, slideIndex])

	return (
		<>
			{isCenterSlide
				? !loading &&
				  updatedStories &&
				  updatedStories.length > 0 && (
						<div style={{ maxWidth: 300, width: 300 }}>
							<Stories
								onStoryStart={(s: number, st: any) => {
									handleRedirect(st.user.username, st.storyId)
								}}
								height='100%'
								storyContainerStyles={{ maxWidth: 300 }}
								stories={updatedStories}
								onAllStoriesEnd={() => {
									swipeTo(slideIndex + 1)
								}}
							/>
						</div>
				  )
				: storyData &&
				  storyData &&
				  !loading &&
				  userData && (
						<MiniStory createdAt={storyData[0].createdAt} userData={userData} imageSrc={storyData[0].image} />
				  )}
		</>
	)
}

export default SingleStory
