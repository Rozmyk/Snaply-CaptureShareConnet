import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Flex, Button, Loader, Center, Box } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import { db } from '@/app/firebase'
import { query, collection, where, or, getDocs, and, addDoc } from 'firebase/firestore'
import { UserProps } from '../../../types'
import SuggestedUsers from './SuggestedUsers/SuggestedUsers'
import UserSelection from './UserSelection/UserSelection'
interface UpdatedUsersDataProps extends UserProps {
	selected: boolean
}

interface SharedUsersListProps {
	users: UpdatedUsersDataProps[] | null
	loading: boolean
	value: string
	setValue: Dispatch<SetStateAction<string>>
	updateUser: (userId: string) => void
	removeUser: (userId: string) => void
	postId: string
	close: () => void
}

const SharedUsersList = ({
	users,
	loading,
	value,
	setValue,
	updateUser,
	removeUser,
	postId,
	close,
}: SharedUsersListProps) => {
	const [selectedUsers, setSelectedUsers] = useState<UpdatedUsersDataProps[] | null>(null)
	const { data: session } = useSession()
	const userId = session?.user?.id
	const { ref: userListRef, height: userListHeight } = useElementSize()

	useEffect(() => {
		if (users) {
			const filteredUsers = users.filter(user => user.selected)
			setSelectedUsers(filteredUsers)
		}
	}, [users])

	const handleSendPosts = async () => {
		if (!selectedUsers || !selectedUsers.length) {
			console.error('No users selected')
			return
		}

		const promises = selectedUsers.map(user => processUser(user))
		try {
			await Promise.all(promises)
			close()
		} catch (error) {
			console.error('Error while processing users:', error)
		}
	}

	const processUser = async (user: UpdatedUsersDataProps) => {
		if (!user.id || !userId) {
			console.error('Invalid user object:', user)
			return
		}
		try {
			const chatId = await findChat(userId, user.id)
			if (chatId) {
				await sendPost(chatId)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const findChat = async (senderId: string, receiverId: string) => {
		const chatQuery = query(
			collection(db, 'chats'),
			or(
				and(where('userID1', '==', senderId), where('userID2', '==', receiverId)),
				and(where('userID2', '==', senderId), where('userID1', '==', receiverId))
			)
		)

		try {
			const querySnapshot = await getDocs(chatQuery)
			let chatId = querySnapshot.empty ? await createChat(senderId, receiverId) : querySnapshot.docs[0].id
			return chatId
		} catch (error) {
			console.error('Error finding chat:', error)
			return null
		}
	}

	const createChat = async (senderId: string, receiverId: string) => {
		const chatRef = await addDoc(collection(db, 'chats'), { userID1: senderId, userID2: receiverId })
		return chatRef.id
	}

	const sendPost = async (chatId: string) => {
		try {
			const messageRef = collection(db, 'chats', chatId, 'messages')
			await addDoc(messageRef, {
				content_type: 'sharePost',
				sender: userId,
				postId,
				createdAt: new Date(),
			})
		} catch (err) {
			console.error('Error sending post:', err)
		}
	}

	return (
		<>
			{loading ? (
				<Center>
					<Loader color='gray' />
				</Center>
			) : (
				<Flex direction='column' style={{ height: '100%' }}>
					<UserSelection selectedUsers={selectedUsers} removeUser={removeUser} value={value} setValue={setValue} />
					<SuggestedUsers
						users={users}
						value={value}
						userListRef={userListRef}
						height={userListHeight}
						updateUser={updateUser}
						removeUser={removeUser}
					/>
					<Box p='sm'>
						<Button
							sx={{
								backgroundColor: '#0494f4',
								'&[data-disabled]': {
									backgroundColor: '#0494f4',
									opacity: 0.4,
									color: 'white',
								},
							}}
							radius='md'
							onClick={handleSendPosts}
							disabled={!selectedUsers || selectedUsers.length === 0}
							fullWidth>
							Send
						</Button>
					</Box>
				</Flex>
			)}
		</>
	)
}

export default SharedUsersList
