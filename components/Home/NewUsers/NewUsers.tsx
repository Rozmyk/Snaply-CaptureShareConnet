'use client'
import { useSession } from 'next-auth/react'
import { Text, Flex, useMantineColorScheme, Center, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import NewUserCard from './NewUserCard/NewUserCard'
import Link from 'next/link'
import { UserProps } from '../../../types'
import { getAllUsers } from '../../../utils/getAllUsers'
const NewUsers = () => {
	const [users, setUsers] = useState<UserProps[]>([])
	const [usersLoading, setUsersLoading] = useState(true)
	const session = useSession()
	const userId = session?.data?.user?.id
	const username = session?.data?.user?.username
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		if (userId) {
			const fetchData = async () => {
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

					setUsers(updatedUsers)
					setUsersLoading(false)
				} catch (error) {
					console.error('Error fetching or processing users:', error)
					throw error
				}
			}
			fetchData()
		}
	}, [userId, username])

	return (
		<>
			<Flex direction='row' justify='space-between' align='center'>
				<Text fz={14} fw={600} color={dark ? '#A8A8A8' : '#737373'}>
					Suggested for you
				</Text>
				<Link
					style={{ fontSize: 12, fontWeight: 700, color: dark ? 'white' : 'black', textDecoration: 'none' }}
					href='/explore/people'>
					See All
				</Link>
			</Flex>
			{usersLoading ? (
				<Center>
					<Loader color='gray' fz='sm' size='sm' mt='50px' mb='50px' />
				</Center>
			) : (
				users.map(user => (
					<NewUserCard
						filledButton={false}
						image={user.image}
						id={user.id}
						key={user.username}
						name={user.name}
						username={user.username}
					/>
				))
			)}
		</>
	)
}
export default NewUsers
