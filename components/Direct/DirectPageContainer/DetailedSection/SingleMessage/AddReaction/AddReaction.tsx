'use client'
import { useState } from 'react'
import { Popover, ActionIcon, useMantineColorScheme } from '@mantine/core'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { IconMoodSmile } from '@tabler/icons-react'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useSession } from 'next-auth/react'
import { SingleReactionProps } from '../../../../../../types'
interface AddReactionProps {
	chatId: string
	messageId: string
}
interface Reaction {
	userId: string
	reaction: string
}
const AddReaction = ({ chatId, messageId }: AddReactionProps) => {
	const [opened, setOpened] = useState(false)
	const session = useSession()
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const addReaction = async (reaction: SingleReactionProps) => {
		try {
			const messageRef = doc(db, 'chats', chatId, 'messages', messageId)

			const messageSnapshot = await getDoc(messageRef)
			const data = messageSnapshot.data()

			if (!data) {
				throw new Error('Message data not found')
			}

			const existingReactions: Reaction[] = data.reactions || []

			const updatedReactions = existingReactions.map(existingReaction => {
				if (existingReaction.userId === userId) {
					return {
						userId: userId,
						reaction,
					}
				}
				return existingReaction
			})

			if (userId && !existingReactions.some(existingReaction => existingReaction.userId === userId)) {
				updatedReactions.push({
					userId: userId,
					reaction,
				})
			}

			await updateDoc(messageRef, {
				reactions: updatedReactions,
			})
		} catch (err) {
			console.error('Error adding reaction:', err)
		}
	}

	return (
		<Popover opened={opened} position='top-start' withArrow arrowPosition='side'>
			<Popover.Target>
				<ActionIcon
					size='md'
					onClick={() => {
						setOpened(!opened)
					}}>
					<IconMoodSmile style={{ color: dark ? 'white' : '#000101' }} size='1.125rem' />
				</ActionIcon>
			</Popover.Target>
			<Popover.Dropdown p='0' style={{ zIndex: 100, position: 'absolute' }}>
				<Picker
					theme={dark ? 'dark' : 'light'}
					data={data}
					onEmojiSelect={(emoji: any) => {
						addReaction(emoji.native)
						setOpened(false)
					}}
				/>
			</Popover.Dropdown>
		</Popover>
	)
}

export default AddReaction
