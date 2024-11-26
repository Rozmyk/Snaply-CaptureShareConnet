import React, { useEffect, useState } from 'react'
import { Flex, useMantineColorScheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { checkIfUserFollowed } from '../../../utils/checkIfUserFollowed'
import { followUser } from '../../../utils/followUser'
import DetailsHeaderLoading from './DetailsHeaderLoading/DetailsHeaderLoading'
import PostModalSettings from '../../PostModalSettings/PostModalSettings'
import UserInfo from './UserInfo/UserInfo'
import FollowButton from './FollowButton/FollowButton'
interface DetailsHeaderProps {
	username: string
	image: string
	addedBy: string
	loading: boolean
	hideLikes: boolean
	turnOffComments: boolean
	postId: string
}

const DetailsHeader = ({
	username,
	image,
	addedBy,
	loading,
	hideLikes,
	turnOffComments,
	postId,
}: DetailsHeaderProps) => {
	const [isFollowed, setIsFollowed] = useState(false)
	const session = useSession()
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

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

	const addFollow = async (followingId: string) => {
		if (userId) {
			const addedFollow = await followUser(userId, followingId)
			setIsFollowed(addedFollow)
		}
	}

	return (
		<>
			{loading ? (
				<DetailsHeaderLoading />
			) : (
				<Flex
					justify='center'
					align='center'
					w='100%'
					h={70}
					p='md'
					sx={{
						borderBottom: `1px solid ${dark ? '#232323' : '#f0ecec'}`,
						position: 'relative',
						backgroundColor: dark ? 'black' : 'white',
					}}>
					<Flex justify='space-between' align='center' w='100%'>
						<UserInfo username={username} image={image} dark={dark} />
						{userId && (
							<FollowButton
								isFollowed={isFollowed}
								userId={userId}
								addedBy={addedBy}
								dark={dark}
								addFollow={addFollow}
							/>
						)}
						<PostModalSettings
							addedBy={addedBy}
							postId={postId}
							hideLikes={hideLikes}
							turnOffComments={turnOffComments}
						/>
					</Flex>
				</Flex>
			)}
		</>
	)
}

export default DetailsHeader
