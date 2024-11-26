import { ScrollArea, Box, Text, useMantineColorScheme } from '@mantine/core'
import UserListItemWithRadio from '../../../../../UserListItemWithRadio/UserListItemWithRadio'
import { UserProps } from '../../../../../../types'
interface updatedUserProps extends UserProps {
	selected: boolean
}
interface UserListProps {
	allUsers: updatedUserProps[]
	value: string
	userListHeight: number
	removeUser: (userId: string) => void
	updateUser: (userId: string) => void
}
const UserList = ({ allUsers, value, userListHeight, removeUser, updateUser }: UserListProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<>
			{allUsers.length > 0 && value !== '' ? (
				<ScrollArea h={userListHeight}>
					{allUsers.filter(user => user.username.includes(value.toLowerCase())).length > 0 ? (
						<ScrollArea h={userListHeight}>
							{allUsers
								.filter(user => user.username.includes(value.toLowerCase()))
								.map(user => {
									return (
										<UserListItemWithRadio
											key={user.id}
											onClickAction={() => {
												user.selected ? removeUser(user.id) : updateUser(user.id)
											}}
											user={user}
										/>
									)
								})}
						</ScrollArea>
					) : (
						<Box p='md'>
							<Text fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
								Account not found.
							</Text>
						</Box>
					)}
				</ScrollArea>
			) : (
				<Box p='md'>
					<Text fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
						Account not found.
					</Text>
				</Box>
			)}
		</>
	)
}

export default UserList
