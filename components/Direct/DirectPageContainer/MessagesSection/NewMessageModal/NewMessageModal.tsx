import { useDisclosure } from '@mantine/hooks'
import { Modal, Box, Flex, useMantineColorScheme } from '@mantine/core'
import UserSearchBar from './UserSearchBar/UserSearchBar'
import { useState, useEffect, ReactNode } from 'react'
import ModalHeader from '../../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import { getAllUsers } from '../../../../../utils/getAllUsers'
import { useElementSize } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import UserList from './UserList/UserList'
import { db } from '@/app/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import UserBadge from './UserBadge/UserBadge'
import ChatButton from './ChatButton/ChatButton'
import { UserProps } from '../../../../../types'
interface NewMessageModalProps {
	children: ReactNode
}
interface updatedUserProps extends UserProps {
	selected: boolean
}
function NewMessageModal({ children }: NewMessageModalProps) {
	const session = useSession()
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const [opened, { open, close }] = useDisclosure(false)
	const [value, setValue] = useState('')
	const [selectedUsers, setSelectedUsers] = useState<updatedUserProps[] | null>(null)
	const userId = session?.data?.user?.id
	const [allUsers, setAllUsers] = useState<updatedUserProps[] | null>(null)
	const { ref: userListRef, height: userListHeight } = useElementSize()
	const redirectToChat = async (secondUserId: string) => {
		const querySnapshot = await getDocs(collection(db, 'chats'))
		let chatId = null

		querySnapshot.forEach(doc => {
			const data = doc.data()

			if (
				(data.userID1 === userId && data.userID2 === secondUserId) ||
				(data.userID1 === secondUserId && data.userID2 === userId)
			) {
				chatId = doc.id
				router.push(`/direct/${chatId}`)
			}
		})

		if (chatId === null) {
			const newChatRef = await addDoc(collection(db, 'chats'), {
				userID1: userId,
				userID2: secondUserId,
			})
			router.push(`/direct/${newChatRef.id}`)
		}
		closeModal()
	}

	const getUsers = async () => {
		try {
			const fetchedUsers = await getAllUsers()
			const usersWithSelected = fetchedUsers.map(user => ({
				...user,
				selected: false,
			}))
			setAllUsers(usersWithSelected)
		} catch (err) {
			console.log(err)
		}
	}

	const updateUser = (userIdToUpdate: string) => {
		const updatedUsers =
			allUsers &&
			allUsers.map(user => {
				if (user.id === userIdToUpdate) {
					return {
						...user,
						selected: true,
					}
				}
				return {
					...user,
					selected: false,
				}
			})
		setValue('')
		setAllUsers(updatedUsers)
	}

	const removeUser = (userIdToRemove: string) => {
		const updatedUsers =
			allUsers &&
			allUsers.map(user => {
				if (user.id === userIdToRemove) {
					return {
						...user,
						selected: false,
					}
				}
				return user
			})
		setAllUsers(updatedUsers)
	}
	const closeModal = () => {
		close()
		setValue('')
		setSelectedUsers([])
		setAllUsers([])
	}
	useEffect(() => {
		getUsers()
	}, [opened])
	useEffect(() => {
		const updatedUsers = allUsers && allUsers.filter(user => user.selected == true)
		setSelectedUsers(updatedUsers)
	}, [value, allUsers])

	return (
		<>
			<Modal.Root size='lg' opened={opened} onClose={closeModal} centered>
				<Modal.Overlay />
				<Modal.Content sx={{ borderRadius: '15px' }}>
					<ModalHeader centerText='New message' closeButton closeButtonAction={closeModal} />

					<Modal.Body m={0} p={0} h={'100%'}>
						<Flex h='100%' direction='column' sx={{ height: '60vh' }}>
							{selectedUsers && selectedUsers.length > 0 && (
								<Flex p='sm' gap='sm'>
									{selectedUsers.map(user => (
										<UserBadge key={user.id} userId={user.id} username={user.username} removeUser={removeUser} />
									))}
								</Flex>
							)}

							<Flex
								w={'100%'}
								direction='column'
								align='flex-start'
								justify='center'
								sx={{
									borderBottom: `1px solid ${dark ? '#373736' : '#dbdbdb'}`,
								}}>
								<UserSearchBar value={value} setValue={setValue} />
							</Flex>

							<Box ref={userListRef} sx={{ flexGrow: 1, width: '100%', minHeight: 0, padding: 'sm' }}>
								{allUsers && (
									<UserList
										allUsers={allUsers}
										value={value}
										userListHeight={userListHeight}
										removeUser={removeUser}
										updateUser={updateUser}
									/>
								)}
							</Box>
							{selectedUsers && <ChatButton redirectToChat={redirectToChat} selectedUsers={selectedUsers} />}
						</Flex>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<div onClick={open}>{children}</div>
		</>
	)
}
export default NewMessageModal
