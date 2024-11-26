import { Flex, Text, ScrollArea, Center, Loader } from '@mantine/core'
import { UserProps } from '../../../types'
import SingleRecentUser from './SingleRecentUser/SingleRecentUser'
import { Dispatch, SetStateAction } from 'react'
interface RecentUsersProps {
	deleteUserfromRecentUsers: (user: UserProps) => void
	recentUsers: UserProps[]
	recentLoading: boolean
	setOpened: Dispatch<SetStateAction<boolean>>
	scrollAreaHeight: number
}
const RecentUsers = ({
	recentUsers,
	recentLoading,
	deleteUserfromRecentUsers,
	setOpened,
	scrollAreaHeight,
}: RecentUsersProps) => {
	console.log(recentUsers)
	return (
		<>
			{recentLoading ? (
				<Center>
					<Loader color='gray' fz='sm'></Loader>
				</Center>
			) : recentUsers.length > 0 ? (
				<ScrollArea.Autosize h={scrollAreaHeight}>
					{recentUsers.map(recentUser => {
						return (
							<SingleRecentUser
								setOpened={setOpened}
								deleteUserfromRecentUsers={deleteUserfromRecentUsers}
								key={recentUser.username}
								recentUser={recentUser}
							/>
						)
					})}
				</ScrollArea.Autosize>
			) : (
				<Flex justify='center' align='center' sx={{ flex: 1 }}>
					<Text fz='sm' color='#A8A8A8'>
						No recent searches.
					</Text>
				</Flex>
			)}
		</>
	)
}

export default RecentUsers
