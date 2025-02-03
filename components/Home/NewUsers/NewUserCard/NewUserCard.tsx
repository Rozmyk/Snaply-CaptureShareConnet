'use client'
import { Avatar, Flex, Text, useMantineColorScheme } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { checkIfUserFollowed } from '../../../../utils/checkIfUserFollowed'
import NewUserCardLoading from './NewUserCardLoading/NewUserCardLoading'
import FollowUnfollowButton from './FollowUnFollowButton/FollowUnfollowButton'
import Link from 'next/link'
interface UserCardProps {
	image: string
	username: string
	name: string
	id: string
	filledButton: boolean
}

const NewUserCard = ({ image, username, id, name, filledButton }: UserCardProps) => {
	const [isFollowed, setIsFollowed] = useState(false)
	const [loading, setLoading] = useState(true)
	const session = useSession()
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		const fetchFollowStatus = async () => {
			try {
				if (userId) {
					setLoading(true)
					const isUserFollowed = await checkIfUserFollowed(userId, id)
					setIsFollowed(isUserFollowed)
					setLoading(false)
				}
			} catch (error) {
				console.error('Error checking if user followed:', error)
			}
		}

		fetchFollowStatus()
	}, [userId, id])

	return loading ? (
		<NewUserCardLoading />
	) : (
		<>
			<Flex justify='space-between' align='center' w={'100%'} pb='sm' pt='sm'>
				<Flex justify='flex-start' align='center' gap='10px'>
					<Link href={`/profile/${username}`}>
						<Avatar size={44} radius='xl' alt={`${name} profile photo`} src={image}></Avatar>
					</Link>
					<Link href={`/profile/${username}`} style={{ textDecoration: 'none' }}>
						<Flex direction='column' gap='none'>
							<Text fz='sm' sx={{ margin: 'none' }} color={dark ? 'white' : 'black'} fw={600}>
								{name}
							</Text>
							<Text sx={{ textTransform: 'capitalize' }} color='dark.2' fz={12}>
								{username}
							</Text>
						</Flex>
					</Link>
				</Flex>
				<FollowUnfollowButton
					filledButton={filledButton}
					isFollowed={isFollowed}
					setIsFollowed={setIsFollowed}
					id={id}
				/>
			</Flex>
		</>
	)
}

export default NewUserCard
