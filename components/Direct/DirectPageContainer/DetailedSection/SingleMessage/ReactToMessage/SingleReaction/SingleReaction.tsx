import { UnstyledButton, Text, Flex, Avatar, useMantineColorScheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { db } from '@/app/firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { UserProps, SingleMessageProps } from '../../../../../../../types'
interface SingleReactionProps {
	user: UserProps
	reaction: string
	closeModal: () => void
	chatId: string
	messageId: string
}
interface Reaction {
	reaction: string
	userId: string
}
const SingleReaction = ({ user, reaction, closeModal, chatId, messageId }: SingleReactionProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const currentUser = userId == user.id
	const removeReaction = async (): Promise<void> => {
		if (userId && chatId && messageId) {
			try {
				const messageRef = doc(db, 'chats', chatId, 'messages', messageId)

				const messageSnapshot = await getDoc(messageRef)
				const existingReactions: Reaction[] = (messageSnapshot.data() as SingleMessageProps)?.reactions || []

				const updatedReactions = existingReactions.filter(existingReaction => {
					return existingReaction.userId !== userId
				})

				await updateDoc(messageRef, {
					reactions: updatedReactions,
				})
				closeModal()
			} catch (err) {
				console.error('Error removing reaction:', err)
			}
		}
	}

	return (
		<UnstyledButton
			onClick={currentUser ? removeReaction : undefined}
			p='sm'
			sx={{
				width: '100%',
				'&:hover': {
					backgroundColor: dark ? '#121212' : '#fbfbfa',
				},
			}}>
			<Flex justify='space-between' align='center' gap='xs'>
				<Avatar size={56} radius='50%' src={user.image}></Avatar>
				<Flex w='100%' direction='column' justify='center' align='flex-start'>
					<Text fz='md' fw={600} color={dark ? 'white' : 'black'}>
						{user.username}
					</Text>

					{currentUser && (
						<Text fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
							Select to remove
						</Text>
					)}
				</Flex>
				<Text>{reaction}</Text>
			</Flex>
		</UnstyledButton>
	)
}

export default SingleReaction
