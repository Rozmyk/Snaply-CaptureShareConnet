'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { Flex, TextInput, ActionIcon } from '@mantine/core'
import { IconBrandTelegram } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { sendReplyToStory } from '../../../../../../../../utils/stories/sendReplyToStory'
import { findChatId } from '../../../../../../../../utils/messages/findChat'
import { createNewChat } from '../../../../../../../../utils/messages/createNewChat'
import { UserProps } from '../../../../../../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface DetailedStoryInputProps {
	setShowPopup: Dispatch<SetStateAction<boolean>>
	action: (action: string) => void
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
const DetailedStoryInput = ({ action, story, setShowPopup }: DetailedStoryInputProps) => {
	const [value, setValue] = useState('')
	const session = useSession()
	const userId = session?.data?.user?.id
	const findOrCreateChat = async () => {
		if (userId) {
			const chatId = await findChatId(story.user.id, userId)
			if (chatId) {
				return chatId
			} else {
				const newChatId = await createNewChat(story.user.id, userId)
				return newChatId
			}
		}
	}
	const sendReply = async () => {
		try {
			const chatId = await findOrCreateChat()
			if (chatId && userId) {
				await sendReplyToStory(chatId, value, userId, story.url)
				setValue('')
				setShowPopup(true)
			}
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Flex
			justify='space-between'
			align='center'
			gap='sm'
			p='sm'
			sx={{ position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 500000, width: 300 }}>
			<TextInput
				onChange={event => setValue(event.currentTarget.value)}
				value={value}
				onFocus={() => {
					action('pause')
				}}
				onBlur={() => {
					action('resume')
				}}
				variant='unstyled'
				px='10px'
				py='1.5px'
				w={'90%'}
				sx={{ border: '1px solid white', borderRadius: '15px' }}
				placeholder={`Reply to ${story.user.username}...`}></TextInput>
			<Flex justify='center' align='center' gap='sm'>
				<ActionIcon
					onClick={() => {
						if (value.trim() !== '') {
							sendReply()
						}
					}}>
					<IconBrandTelegram style={{ color: 'white' }}></IconBrandTelegram>
				</ActionIcon>
			</Flex>
		</Flex>
	)
}

export default DetailedStoryInput
