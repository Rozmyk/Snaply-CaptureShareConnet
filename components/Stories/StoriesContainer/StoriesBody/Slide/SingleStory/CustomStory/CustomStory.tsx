'use client'
import { useState, useEffect } from 'react'
import { BackgroundImage } from '@mantine/core'
import DetailedStoryHeader from './DetailedStoryHeader/DetailedStoryHeader'
import DetailedStoryInput from './DetailedStoryInput/DetailedStoryInput'
import SendPopup from './SendPopup/SendPopup'
import { useSession } from 'next-auth/react'
import { changeStoryViewedState } from '../../../../changeStoryViewedState'
import { UserProps } from '../../../../../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface updatedStoryProps {
	isPaused: boolean
	action: (action: string) => void
	width: number | string
	closeButtonAction: () => void
	story: {
		duration: number
		url: string
		user: UserProps
		createdAt: Timestamp
		id: string
		viewedBy: string[]
		content: (props: any) => JSX.Element
	}
}
const CustomStory = ({ story, isPaused, action, width, closeButtonAction }: updatedStoryProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id
	const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		if (userId) {
			const changeViewState = async () => {
				await changeStoryViewedState(story.user.id, story.id, userId)
			}
			if (!story.viewedBy.includes(userId)) {
				changeViewState()
			} else {
			}
		}
	}, [userId, story.id, story.user.id, story.viewedBy])
	return (
		<div style={{ position: 'relative', maxWidth: width }}>
			<BackgroundImage radius='sm' w={width} h={500} src={story.url}>
				<DetailedStoryHeader
					isPaused={isPaused}
					action={action}
					story={story}
					width={width}
					closeButtonAction={closeButtonAction}
				/>
				<DetailedStoryInput setShowPopup={setShowPopup} action={action} story={story} />
				{showPopup && <SendPopup setShowPopup={setShowPopup} />}
			</BackgroundImage>
		</div>
	)
}

export default CustomStory
