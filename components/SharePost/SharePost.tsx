import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getAllUsers } from '../../utils/getAllUsers'
import { useState, useEffect, ReactNode } from 'react'
import ModalHeader from '../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import SharedUsersList from './SharedUsersList/SharedUsersList'
import { UserProps } from '../../types'
import { useSession } from 'next-auth/react'
interface SharePostProps {
	children: ReactNode
	postId: string
}
interface updatedUsersDataProps extends UserProps {
	selected: boolean
}
const SharePost = ({ children, postId }: SharePostProps) => {
	const [opened, { open, close }] = useDisclosure(false)
	const [allUsers, setAllUsers] = useState<updatedUsersDataProps[] | null>(null)
	const [value, setValue] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)
	const session = useSession()
	const userId = session?.data?.user?.id

	const updateUser = (userIdToUpdate: string) => {
		let updatedUsers

		if (allUsers) {
			updatedUsers = allUsers.map(user => {
				if (user.id === userIdToUpdate) {
					return {
						...user,
						selected: true,
					}
				}
				return user
			})
		}

		if (updatedUsers) {
			setAllUsers(updatedUsers)
		}
	}

	const removeUser = (userIdToRemove: string) => {
		let updatedUsers
		if (allUsers) {
			updatedUsers = allUsers.map(user => {
				if (user.id === userIdToRemove) {
					return {
						...user,
						selected: false,
					}
				}
				return user
			})
		}
		if (updatedUsers) {
			setAllUsers(updatedUsers)
		}
	}

	useEffect(() => {
		const getUsers = async () => {
			try {
				const fetchedUsers = await getAllUsers()

				const filteredUsers = fetchedUsers
					.filter(user => user.id !== userId)
					.map(user => ({
						...user,
						selected: false,
					}))
				setAllUsers(filteredUsers)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		getUsers()
	}, [userId])

	return (
		<>
			<Modal.Root size='lg' radius={'15px'} centered opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content>
					<ModalHeader closeButton centerText='Share' closeButtonAction={close} />
					<Modal.Body h={'60vh'} m={0} p={0}>
						<SharedUsersList
							close={close}
							postId={postId}
							value={value}
							setValue={setValue}
							updateUser={updateUser}
							removeUser={removeUser}
							loading={loading}
							users={allUsers && value !== '' ? allUsers.filter(user => user.username.includes(value)) : allUsers}
						/>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<div onClick={open}>{children}</div>
		</>
	)
}

export default SharePost
