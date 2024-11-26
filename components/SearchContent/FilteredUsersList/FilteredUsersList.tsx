import SingleFilteredUser from './SingleFilteredUser/SingleFilteredUser'
import { Flex, Text, Center, Loader, ScrollArea } from '@mantine/core'
import { UserProps } from '../../../types'
import { SetStateAction, Dispatch } from 'react'
interface FilteredUsersListProps {
	filteredUsers: UserProps[]
	filteredUsersLoading: boolean
	checkIfUserExists: (user: UserProps) => void
	setOpened: Dispatch<SetStateAction<boolean>>
	scrollAreaHeight: number
}
const FilteredUsersList = ({
	filteredUsers,
	filteredUsersLoading,
	checkIfUserExists,
	setOpened,
	scrollAreaHeight,
}: FilteredUsersListProps) => {
	return (
		<>
			{filteredUsersLoading ? (
				<Center>
					<Loader color='gray'></Loader>
				</Center>
			) : filteredUsers.length > 0 ? (
				<ScrollArea.Autosize h={scrollAreaHeight}>
					{filteredUsers.map(user => {
						return (
							<SingleFilteredUser
								setOpened={setOpened}
								key={user.id}
								user={user}
								checkIfUserExists={checkIfUserExists}
							/>
						)
					})}
				</ScrollArea.Autosize>
			) : (
				<Flex justify='center' align='center' sx={{ flex: 1 }}>
					<Text fz='sm' color='#A8A8A8'>
						No results found.
					</Text>
				</Flex>
			)}
		</>
	)
}

export default FilteredUsersList
