'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Center, Loader, useMantineColorScheme, ScrollArea } from '@mantine/core'
import { useRouter } from 'next/navigation'
import NewUserCard from '../../../../Home/NewUsers/NewUserCard/NewUserCard'
import CustomButtonTransparent from '../../../../CustomButton/CustomButtonTransparent/CustomButtonTransparent'
import { useSession } from 'next-auth/react'
import { UserProps } from '../../../../../types'
import { getAllUsers } from '../../../../../utils/getAllUsers'
const SuggestedForYou = ({ maxHeight }: { maxHeight: number }) => {
	const [notFollowedUsers, setNotFollowedusers] = useState<UserProps[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const router = useRouter()
	const session = useSession()
	const userId = session?.data?.user?.id
	const username = session?.data?.user?.username
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		if (userId) {
			const getNotFollowedUsers = async () => {
				try {
					const allUsers = await getAllUsers()

					const updatedUsers = allUsers
						.filter(user => {
							if (user.username === username) {
								return false
							}

							if (user.followers && user.followers.includes(userId)) {
								return false
							}

							return true
						})
						.slice(0, 5)

					setNotFollowedusers(updatedUsers)
					setLoading(false)
				} catch (error) {
					console.error('Error fetching or processing users:', error)
					throw error
				}
			}
			getNotFollowedUsers()
		}
	}, [userId, username])
	return (
		<ScrollArea h={maxHeight}>
			<Text fw={600} mb='lg' color={dark ? 'white' : 'black'}>
				Suggested for you
			</Text>
			<Flex direction='column'>
				{loading ? (
					<Center>
						<Loader size='xs' color='gray'></Loader>
					</Center>
				) : (
					notFollowedUsers.length > 0 &&
					notFollowedUsers.map(user =>
						user.id === userId ? null : <NewUserCard key={user.id} {...user} filledButton={false} />
					)
				)}
			</Flex>
			<CustomButtonTransparent
				style={{ marginTop: 15 }}
				onClick={() => {
					router.push('/explore/people')
				}}>
				See All Suggestions
			</CustomButtonTransparent>
		</ScrollArea>
	)
}

export default SuggestedForYou
