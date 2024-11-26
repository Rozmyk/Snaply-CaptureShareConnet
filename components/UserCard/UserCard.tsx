'use client'
import { Avatar, Flex, Text, useMantineColorScheme } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { checkIfUserFollowed } from '../../utils/checkIfUserFollowed'
import { followUser } from '../../utils/followUser'
import { unfollowUser } from '../../utils/unfollowUser'
import CustomButton from '../CustomButton/CustomButton'
import UserCardLoading from './UserCardLoading/UserCardLoading'
import Link from 'next/link'

interface UserCardProps {
	image: string
	username: string
	name: string
	id: string
}

const UserCard = ({ image, username, id, name }: UserCardProps) => {
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
				setLoading(true)
				if (userId) {
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
		<UserCardLoading />
	) : (
		<Link href={`/profile/${username}`} style={{ textDecoration: 'none' }}>
			<Flex justify='space-between' align='center' w={'100%'} p='sm'>
				<Flex justify='flex-start' align='center' gap='10px'>
					<Avatar size={44} radius='xl' alt={`${name} profile photo`} src={image}></Avatar>
					<Flex direction='column' gap='none'>
						<Text fz={14} sx={{ margin: 'none' }} color={dark ? '#f5f5f5' : 'black'} fw={500}>
							{name}
						</Text>
						<Text color={dark ? '#a8a8a8' : '#737373'} fz={14}>
							{username}
						</Text>
					</Flex>
				</Flex>
				{userId == id ? null : (
					<div onClick={e => e.preventDefault()}>
						{isFollowed ? (
							<CustomButton
								style={{ backgroundColor: dark ? '#464746' : '#efeeee', color: dark ? 'white' : 'black' }}
								onClick={async e => {
									e.stopPropagation()
									e.preventDefault()
									deleteFollow(id)
								}}>
								Following
							</CustomButton>
						) : (
							<CustomButton
								onClick={async e => {
									e.stopPropagation()
									e.preventDefault()
									addFollow(id)
								}}>
								Follow
							</CustomButton>
						)}
					</div>
				)}
			</Flex>
		</Link>
	)
}

export default UserCard
