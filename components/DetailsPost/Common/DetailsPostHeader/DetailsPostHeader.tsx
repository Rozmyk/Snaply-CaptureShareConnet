import React, { useEffect, useState } from 'react'
import { Text, Anchor, Flex, useMantineColorScheme, Box, ActionIcon, Grid } from '@mantine/core'
import UserAvatar from '../../../UserAvatar/UserAvatar'
import Link from 'next/link'
import { IconDots } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { checkIfUserFollowed } from '../../../../utils/checkIfUserFollowed'
import DetailsPostHeaderLoading from './DetailsPostHeaderLoading/DetailsPostHeaderLoading'
import { followUser } from '../../../../utils/followUser'

interface DetailsHeaderProps {
	username: string
	image: string
	addedBy: string
	loading: boolean
}

const DetailsPostHeader = ({ username, image, addedBy, loading }: DetailsHeaderProps) => {
	const [isFollowed, setIsFollowed] = useState(false)
	const session = useSession()
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()

	useEffect(() => {
		const fetchFollowStatus = async () => {
			try {
				if (userId) {
					const isUserFollowed = await checkIfUserFollowed(userId, addedBy)
					setIsFollowed(isUserFollowed)
				}
			} catch (error) {
				console.error('Error checking if user followed:', error)
			}
		}

		fetchFollowStatus()
	}, [userId, addedBy])

	return (
		<>
			{loading ? (
				<DetailsPostHeaderLoading />
			) : (
				<Box w='100%' h={70} sx={{ borderBottom: '1px solid #232323', position: 'relative' }}>
					<Grid justify='center' align='center' h='100%' w='100%' sx={{ padding: 0, margin: 0 }}>
						<Grid.Col span={2}>
							<Flex justify='center' align='center'>
								<UserAvatar src={image} size='md' alt='user' />
							</Flex>
						</Grid.Col>
						<Grid.Col span={8} m={0} p={0}>
							<Flex justify='flex-start' gap='5px' align='center'>
								<Text
									color={colorScheme === 'dark' ? 'gray.0' : 'gray.9'}
									ml='sm'
									fz='sm'
									fw={700}
									component={Link}
									href={`/profile/${username}`}>
									{username}
								</Text>
								{!isFollowed && (
									<>
										<Text fz='sm' color={colorScheme === 'dark' ? 'gray.0' : 'gray.9'}>
											•
										</Text>
										<Anchor
											type='button'
											sx={{ fontWeight: 600 }}
											size='sm'
											onClick={async () => {
												if (userId) {
													const followInProgress = await followUser(addedBy, userId)
													if (followInProgress) {
														setIsFollowed(true)
													} else {
														setIsFollowed(false)
													}
												}
											}}>
											Follow
										</Anchor>
									</>
								)}
							</Flex>
						</Grid.Col>
						<Grid.Col span={2}>
							<Flex justify='center' align='center'>
								<ActionIcon>
									<IconDots />
								</ActionIcon>
							</Flex>
						</Grid.Col>
					</Grid>
				</Box>
			)}
		</>
	)
}

export default DetailsPostHeader
