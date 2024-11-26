'use client'
import { useState, useEffect } from 'react'
import { Container, Loader, Text, Divider, Flex, Box, useMantineColorScheme } from '@mantine/core'
import { getAllUsers } from '../../../../utils/getAllUsers'
import UserCard from '../../../UserCard/UserCard'
import { UserProps } from '../../../../types'
import { useSession } from 'next-auth/react'

const PeopleContainer = () => {
	const [users, setUsers] = useState<UserProps[] | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const session = useSession()
	const { colorScheme } = useMantineColorScheme()
	const userId = session?.data?.user?.id
	const username = session?.data?.user?.username

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (userId) {
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

					setUsers(updatedUsers)
					setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching or processing users:', error)
				throw error
			}
		}
		fetchData()
	}, [username, userId])
	return (
		<Container>
			<Flex mt='xl' direction='column' justify='center' align='center'>
				{loading ? (
					<Loader></Loader>
				) : (
					<>
						<Box w='100%'>
							<Text mb='xs' fz={16} fw={700}>
								Suggested for you
							</Text>

							<Divider mb='lg' />
						</Box>
						{users && users.length > 0 ? (
							<Flex direction='column' maw={600} w='100%'>
								{users &&
									users.length > 0 &&
									users.map(user => {
										return <UserCard key={user.id} {...user}></UserCard>
									})}
							</Flex>
						) : (
							<Text fw={600} m='xl' fz='lg' color={colorScheme == 'dark' ? 'white' : 'black'}>
								No suggested users available at the moment.
							</Text>
						)}
					</>
				)}
			</Flex>
		</Container>
	)
}

export default PeopleContainer
