import { Center, Flex, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import Stories from 'react-insta-stories'
import { useSearchParams } from 'next/navigation'
import { SingleSavedStoryProps, UserProps, SingleStoryProps } from '../../../../../../../types'
import getStoryById from '../../../../../../../utils/stories/getStoryById'
import { fetchUserData } from '../../../../../../../utils/user/fetchUserData'
import CustomMobileSlide from './HighlightSlideMobile/CustomMobileSlide/CustomMobileSlide'
import { useRouter } from 'next/navigation'
import { sendReplyToStory } from '../../../../../../../utils/stories/sendReplyToStory'
import { findOrCreateChat } from './Utils/findOrCreateChat'
import { useSession } from 'next-auth/react'
import QuickReaction from './QuickReaction/QuickReaction'
import SendPopup from '../../../../../StoriesContainer/StoriesBody/Slide/SingleStory/CustomStory/SendPopup/SendPopup'
import MobileStoryInput from './HighlightSlideMobile/MobileStoryInput/MobileStoryInput'
import { Timestamp } from 'firebase-admin/firestore'
interface HighlightBodyMobileProps {
	allHighlightsData: SingleSavedStoryProps[]
}
interface UpdatedHighlightsProps {
	duration: number
	url: string
	user: UserProps
	createdAt: Timestamp
	id: string
	content: (props: SingleSavedStoryProps) => JSX.Element
}
const HighlightBodyMobile = ({ allHighlightsData }: HighlightBodyMobileProps) => {
	const [activeHighlight, setActiveHighlight] = useState<SingleSavedStoryProps | null>(null)
	const [updatedHighlights, setUpdatedHighlight] = useState<UpdatedHighlightsProps[] | null>(null)
	const [storiesLoading, setStoriesLoading] = useState<boolean>(true)
	const [inputValue, setInputValue] = useState<string>('')
	const [currentStoryImageUrl, setCurrentStoryImageUrl] = useState<string | null>(null)
	const [showPopup, setShowPopup] = useState<boolean>(false)
	const [allStoriesEnd, setAllStoriesEnd] = useState<boolean>(false)
	const [inputFocused, setInputFocused] = useState<boolean>(false)
	const searchParams = useSearchParams()

	const router = useRouter()
	const session = useSession()
	const userId = session?.data?.user?.id

	const sendReply = async (data: string) => {
		if (activeHighlight && currentStoryImageUrl && userId) {
			try {
				const chatId = await findOrCreateChat(activeHighlight?.addedBy, userId)

				await sendReplyToStory(chatId, data, userId, currentStoryImageUrl)
				setInputValue('')
				setInputFocused(false)
				setShowPopup(true)
			} catch (err) {
				console.log(err)
			}
		}
	}
	useEffect(() => {
		const id = searchParams.get('id')

		if (id) {
			const foundHighlight = allHighlightsData.find(highlight => highlight.id === id)

			if (foundHighlight) {
				setActiveHighlight(foundHighlight)
			} else {
				console.log(`No highlight found with ID: ${id}`)
			}
		}
	}, [searchParams, allHighlightsData])

	const getNextStory = (currentId: string, allHighlightsData: SingleSavedStoryProps[]) => {
		const currentIndex = allHighlightsData.findIndex(highlight => highlight.id === currentId)

		if (currentIndex !== -1) {
			const nextIndex = currentIndex + 1
			if (nextIndex < allHighlightsData.length) {
				setActiveHighlight(allHighlightsData[nextIndex])
				return allHighlightsData[nextIndex]
			} else {
				setAllStoriesEnd(true)
				return null
			}
		} else {
			console.log(`No highlight found with ID: ${currentId}`)
			return null
		}
	}

	useEffect(() => {
		const fetchSingleStory = async () => {
			let fetchedStories: UpdatedHighlightsProps[] = []
			if (activeHighlight && activeHighlight.storyIds) {
				for (const id of activeHighlight.storyIds) {
					const fetchedStory = (await getStoryById(activeHighlight.addedBy, id)) as SingleStoryProps
					if (fetchedStory && fetchedStory.addedBy) {
						const userData = await fetchUserData(fetchedStory.addedBy)
						if (userData) {
							const newHighlights: UpdatedHighlightsProps = {
								duration: 6000,
								url: fetchedStory.image,
								user: userData,
								createdAt: fetchedStory.createdAt,
								id: fetchedStory.id,
								content: (props: any) => <CustomMobileSlide {...props} />,
							}
							fetchedStories.push(newHighlights)
						}
					}
				}

				setUpdatedHighlight(fetchedStories)
				setStoriesLoading(false)
			}
		}
		fetchSingleStory()
	}, [activeHighlight])

	useEffect(() => {
		if (allStoriesEnd) {
			router.push('/')
		}
	}, [allStoriesEnd, router])
	return (
		!allStoriesEnd && (
			<Flex direction='column' justify='center' align='center' sx={{ backgroundColor: 'black', width: '100%' }}>
				{storiesLoading ? (
					<Center>
						<Loader color='gray' size='sm' />
					</Center>
				) : (
					updatedHighlights && (
						<div style={{ position: 'relative', width: '100%', height: '100%' }}>
							<Stories
								isPaused={inputFocused}
								onStoryStart={(s: number, st: any) => setCurrentStoryImageUrl(st.url)}
								onAllStoriesEnd={() => {
									if (activeHighlight) {
										getNextStory(activeHighlight?.id, allHighlightsData)
									}
								}}
								width={'100%'}
								storyContainerStyles={{ backgroundColor: 'black', height: '100%', padding: 0, margin: 0 }}
								stories={updatedHighlights ? updatedHighlights : []}
							/>
							{showPopup && <SendPopup setShowPopup={setShowPopup} />}
							<QuickReaction inputFocused={inputFocused} setInputFocused={setInputFocused} sendReply={sendReply} />
						</div>
					)
				)}

				{storiesLoading ? (
					<></>
				) : (
					userId !== activeHighlight?.addedBy && (
						<MobileStoryInput
							sendReply={sendReply}
							inputFocused={inputFocused}
							inputValue={inputValue}
							setInputValue={setInputValue}
							setInputFocused={setInputFocused}
						/>
					)
				)}
			</Flex>
		)
	)
}

export default HighlightBodyMobile
