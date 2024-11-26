import { Stack, Text, Flex } from '@mantine/core'
import UserChatItem from './UserChatItem/UserChatItem'
import { collection, onSnapshot, query, where, getDocs, orderBy, limit, or } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useSession } from 'next-auth/react'
import UserChatItemLoading from './UserChatItem/UserChatItemLoading/UserChatItemLoading'
import { useRouter } from 'next/navigation'
import { fetchUserData } from '../../../../../utils/user/fetchUserData'
import { useEffect, useState } from 'react'
import { SingleMessageProps, UserProps } from '../../../../../types'

interface UserChatListProps {
	chatId: string
}

interface SingleUserMessageProps {
	userData: UserProps
	lastMessage: SingleMessageProps | null
	chatId: string
}

const UserChatList = ({ chatId }: UserChatListProps) => {
	const session = useSession()
	const router = useRouter()

	const userId = session?.data?.user?.id
	const [loading, setLoading] = useState(true)
	const [usersMessages, setUsersMessages] = useState<SingleUserMessageProps[] | null>(null)
	const [noMessages, setNoMessages] = useState(false)

	const setUpNewChat = (newChat: string) => {
		router.push(`/direct/${newChat}`)
	}

	useEffect(() => {
		if (!userId) return

		const chatQuery = query(collection(db, 'chats'), or(where('userID1', '==', userId), where('userID2', '==', userId)))

		setLoading(true)

		const unsubscribe = onSnapshot(chatQuery, async snapshot => {
			const updates: Promise<SingleUserMessageProps>[] = []

			snapshot.docChanges().forEach(change => {
				const chatDoc = change.doc
				const chatId = chatDoc.id

				if (change.type === 'added' || change.type === 'modified') {
					updates.push(
						(async () => {
							const userIdToFetch = userId === chatDoc.data().userID1 ? chatDoc.data().userID2 : chatDoc.data().userID1

							const userData = await fetchUserData(userIdToFetch)

							if (!userData) {
								// Jeśli userData jest undefined, pomijamy ten wpis
								throw new Error(`User data not found for ID: ${userIdToFetch}`)
							}

							const messagesCollection = collection(chatDoc.ref, 'messages')
							const messagesQuery = query(messagesCollection, orderBy('createdAt', 'desc'), limit(1))
							const messagesSnapshot = await getDocs(messagesQuery)

							let lastMessage: SingleMessageProps | null = null
							messagesSnapshot.forEach(messageDoc => {
								lastMessage = messageDoc.data() as SingleMessageProps
							})

							return { chatId, userData, lastMessage }
						})()
					)
				}
			})

			try {
				const results = await Promise.all(updates)

				if (results.length === 0) {
					setNoMessages(true)
				} else {
					setNoMessages(false)
				}

				setUsersMessages(prevMessages => {
					const updatedMessages = [...(prevMessages || [])]

					results.forEach(({ chatId, userData, lastMessage }) => {
						const index = updatedMessages.findIndex(chat => chat.chatId === chatId)
						if (index > -1) {
							updatedMessages[index] = { chatId, userData, lastMessage }
						} else {
							updatedMessages.push({ chatId, userData, lastMessage })
						}
					})

					return updatedMessages.sort((a, b) => {
						const aTime = a.lastMessage?.createdAt?.toMillis() ?? 0
						const bTime = b.lastMessage?.createdAt?.toMillis() ?? 0

						return bTime - aTime
					})
				})

				setLoading(false)
			} catch (error) {
				console.error('Error processing chat updates:', error)
				setLoading(false)
			}
		})

		return () => unsubscribe()
	}, [userId])

	useEffect(() => {
		if (!userId || !chatId) return

		const unsubscribe = onSnapshot(
			collection(db, 'chats', chatId, 'messages'),
			snapshot => {
				snapshot.docChanges().forEach(change => {
					if (change.type === 'modified') {
						const updatedMessage = change.doc.data() as SingleMessageProps

						setUsersMessages(prevMessages =>
							prevMessages
								? prevMessages.map(chat =>
										chat.chatId === chatId
											? {
													...chat,
													lastMessage: updatedMessage,
											  }
											: chat
								  )
								: []
						)
					}
				})
			},
			error => {
				console.error('Error with message listener:', error)
			}
		)

		return () => unsubscribe()
	}, [userId, chatId])

	return (
		<Flex h='100%' justify='center' align='center'>
			{loading ? (
				noMessages ? (
					<Text>No messages found.</Text>
				) : (
					<Stack spacing='0px' w='100%'>
						<UserChatItemLoading />
						<UserChatItemLoading />
						<UserChatItemLoading />
					</Stack>
				)
			) : usersMessages && usersMessages.length > 0 ? (
				<Stack m={0} p={0} spacing={0} w='100%'>
					{usersMessages.map(
						user =>
							user.lastMessage && (
								<UserChatItem
									key={user.userData.id}
									active={user.chatId === chatId}
									onClick={() => setUpNewChat(user.chatId)}
									sender={user.lastMessage.sender}
									message={user.lastMessage}
									userData={user.userData}
								/>
							)
					)}
				</Stack>
			) : (
				<Text>No messages found.</Text>
			)}
		</Flex>
	)
}

export default UserChatList
