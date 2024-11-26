'use client'
import { useState, useEffect } from 'react'
import { Box, Text, Flex, Anchor, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { db } from '@/app/firebase'
import { query, where, getDocs } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import Followers from './Followers/Followers'
import Following from './Following/Following'
interface UserStatsProps {
	userId: string
	followers: string[]
	following: string[]
}
const UserStats = ({ userId, followers, following }: UserStatsProps) => {
	const [postsCount, setPostsCount] = useState(0)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 775px)')
	const followingLength = following ? following.length : 0
	const followersLength = followers ? followers.length : 0

	const followersData = followers || []
	const followingData = following || []

	useEffect(() => {
		const getPostsCount = async () => {
			try {
				const postsRef = collection(db, 'posts')
				const querySnapshot = await getDocs(query(postsRef, where('addedBy', '==', userId)))

				if (!querySnapshot.empty) {
					setPostsCount(querySnapshot.size)
				} else {
					setPostsCount(0)
				}
			} catch (error) {
				console.error('Error fetching post count:', error)
			}
		}

		getPostsCount()
	}, [userId])

	const UserStatsMobile = (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			<Flex direction='column' justify='center' align='center' sx={{ fontSize: 14 }}>
				<Text color='#a8a8a8'>Posts:</Text>
				<Text color={dark ? 'white' : 'black'} fw={600}>
					{postsCount}{' '}
				</Text>
			</Flex>
			<Flex direction='column' justify='center' align='center' sx={{ fontSize: 14 }}>
				<Text color='#a8a8a8'>Followers:</Text>
				<Followers followersData={followersData}>
					<Text color={dark ? 'white' : 'black'} fw={600}>
						{followersLength}
					</Text>
				</Followers>
			</Flex>
			<Flex direction='column' justify='center' align='center' sx={{ fontSize: 14 }}>
				<Text color='#a8a8a8'>Following:</Text>
				<Text color={dark ? 'white' : 'black'} fw={600}>
					{followingLength}
				</Text>
			</Flex>
		</Box>
	)
	const userStatsDesktop = (
		<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}>
			<Flex gap='5px'>
				<Text fw={700} color={dark ? 'white' : 'black'}>
					{postsCount}
				</Text>
				<Text> posts</Text>
			</Flex>
			<Followers followersData={followersData}>
				<Flex gap='5px'>
					<Anchor color={dark ? 'white' : 'black'} component='button' fw={700}>
						{followersLength}
					</Anchor>

					<Text>followers</Text>
				</Flex>
			</Followers>
			<Following followingData={followingData}>
				<Flex gap='5px'>
					<Anchor color={dark ? 'white' : 'black'} component='button' fw={700}>
						{followingLength}
					</Anchor>

					<Text>following</Text>
				</Flex>
			</Following>
		</Box>
	)
	return isSmallScreen ? UserStatsMobile : userStatsDesktop
}

export default UserStats
