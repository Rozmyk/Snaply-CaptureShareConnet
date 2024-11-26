import ProfileCustomButton from '../../ProfileCustomButton/ProfileCustomButton'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import CustomButton from '../../../CustomButton/CustomButton'
import { followUser } from '../../../../utils/followUser'
import { unfollowUser } from '../../../../utils/unfollowUser'
import { checkIfUserFollowed } from '../../../../utils/checkIfUserFollowed'
import { Skeleton } from '@mantine/core'
interface FollowStatusButtonProps {
	secondUserId: string
}
const FollowStatusButton = ({ secondUserId }: FollowStatusButtonProps) => {
	const [isFollowed, setIsFollowed] = useState(false)
	const [followStatusLoading, setFollowStatusLoading] = useState(true)
	const session = useSession()
	const userId = session?.data?.user?.id
	const addFollow = async (followingId: string) => {
		if (userId) {
			const addedFollow = await followUser(userId, followingId)
			setIsFollowed(addedFollow)
		}
	}
	const deleteFollow = async (followingId: string) => {
		if (userId) {
			const deleteFollow = await unfollowUser(userId, followingId)
			setIsFollowed(!deleteFollow)
		}
	}
	useEffect(() => {
		const fetchFollowStatus = async () => {
			try {
				if (userId) {
					const isUserFollowed = await checkIfUserFollowed(userId, secondUserId)
					setIsFollowed(isUserFollowed)
					setFollowStatusLoading(false)
				}
			} catch (error) {
				console.error('Error checking if user followed:', error)
			}
		}

		fetchFollowStatus()
	}, [userId, secondUserId])

	return (
		<Skeleton visible={followStatusLoading}>
			{isFollowed ? (
				<ProfileCustomButton
					onClick={() => {
						deleteFollow(secondUserId)
					}}>
					Following
				</ProfileCustomButton>
			) : (
				<CustomButton
					onClick={() => {
						addFollow(secondUserId)
					}}>
					Follow
				</CustomButton>
			)}
		</Skeleton>
	)
}

export default FollowStatusButton
