import { Text, Box, ScrollArea } from '@mantine/core'
import React, { RefObject } from 'react'
import SharedUser from './SharedUser/SharedUser'
import { UserProps } from '../../../../types'
interface UpdatedUsersDataProps extends UserProps {
	selected: boolean
}
interface SuggestedUsersProps {
	users: UpdatedUsersDataProps[] | null
	value: string
	userListRef: RefObject<HTMLDivElement>
	height: number
	updateUser: (userId: string) => void
	removeUser: (userId: string) => void
}
const SuggestedUsers = ({ users, value, userListRef, height, updateUser, removeUser }: SuggestedUsersProps) => (
	<>
		{value.trim() === '' && (
			<Text pr='sm' pl='sm' mb='xs' mt='xs' fz='sm' fw={700}>
				Suggested
			</Text>
		)}
		<Box ref={userListRef} p='sm' style={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
			<ScrollArea h={height}>
				{users &&
					users.map(user => <SharedUser key={user.id} user={user} addUser={updateUser} removeUser={removeUser} />)}
			</ScrollArea>
		</Box>
	</>
)

export default SuggestedUsers
