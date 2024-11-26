'use client'
import { Flex, Avatar, Text, Button, useMantineColorScheme, Skeleton } from '@mantine/core'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { checkIfUserFollowed } from '../../../../../utils/checkIfUserFollowed'
import { toggleViewedNotification } from '../../../../../utils/notifications/toggleViewedNotification'
import { useSession } from 'next-auth/react'
import getTimeDifference from '../../../../../utils/getTimeDifference'
import { unfollowUser } from '../../../../../utils/unfollowUser'
import { followUser } from '../../../../../utils/followUser'
import CustomButton from '../../../../CustomButton/CustomButton'
import { updatedNotificationsProps } from '../../../../../types'

const FollowedYou = ({ user, createdAt, viewed, id }: updatedNotificationsProps) => {
	const [isFollowed, setIsFollowed] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const session = useSession()
	const userId = session?.data?.user?.id

	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const addFollow = async (followingId: string) => {
		if (userId && followingId) {
			const addedFollow = await followUser(userId, followingId)
			setIsFollowed(addedFollow)
		}
	}
	const deleteFollow = async (followingId: string) => {
		if (userId && followingId) {
			const removedFollow = await unfollowUser(userId, followingId)
			setIsFollowed(!removedFollow)
		}
	}

	useEffect(() => {
		const fetchFollowStatus = async () => {
			try {
				if (userId) {
					const isUserFollowed = await checkIfUserFollowed(userId, user.id)
					setIsFollowed(isUserFollowed)
					setLoading(false)
				}
			} catch (error) {
				console.error('Error checking if user followed:', error)
			}
		}

		fetchFollowStatus()
	}, [user, userId])
	useEffect(() => {
		if (!viewed && userId) {
			toggleViewedNotification(id, userId)
		}
	}, [id, userId, viewed])
	return (
		<Link href={`/profile/${user.username}`} style={{ textDecoration: 'none' }}>
			<Flex
				justify='space-between'
				align='center'
				w={'100%'}
				pt='xs'
				pb='xs'
				sx={{
					textDecoration: 'none',
					color: dark ? 'white' : 'black',
					'&:hover': {
						backgroundColor: dark ? '#121313' : '#fafbfb',
					},
				}}>
				{loading ? (
					<>
						<Skeleton circle height={44}></Skeleton>
						<Skeleton h={25}></Skeleton>
					</>
				) : (
					<>
						<Flex justify='center' align='center' gap='5px'>
							<Avatar radius={'50%'} size={44} src={user.image}></Avatar>
							<Text fw={400} size={14}>
								<span style={{ fontWeight: '700' }}>{`${user.username} `}</span>
								started following you.
								<br />
								<span style={{ color: dark ? '#A8A8A8' : '#737373' }}> {getTimeDifference(createdAt)}</span>
							</Text>
						</Flex>
						<Flex gap='sm'>
							{isFollowed ? (
								<Button
									radius='md'
									color='gray'
									size='xs'
									onClick={async () => {
										deleteFollow(user.id)
									}}>
									Unfollow
								</Button>
							) : (
								<CustomButton
									onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation()
										addFollow(user.id)
									}}>
									Follow
								</CustomButton>
							)}
						</Flex>
					</>
				)}
			</Flex>
		</Link>
	)
}

export default FollowedYou
