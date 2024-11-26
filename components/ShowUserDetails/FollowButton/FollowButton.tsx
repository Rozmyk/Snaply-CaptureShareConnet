import React, { Dispatch, SetStateAction } from 'react'
import CustomButton from '../../CustomButton/CustomButton'
import { IconUserPlus } from '@tabler/icons-react'
import { followUser } from '../../../utils/followUser'
import { unfollowUser } from '../../../utils/unfollowUser'
interface FollowButtonProps {
	isFollowed: boolean
	setIsFollowed: Dispatch<SetStateAction<boolean>>
	userId: string
	userDetailsId: string
}
const FollowButton = ({ isFollowed, setIsFollowed, userId, userDetailsId }: FollowButtonProps) => {
	const handleFollow = async () => {
		const isBeingFollowed = await followUser(userId, userDetailsId)
		if (isBeingFollowed) {
			setIsFollowed(true)
		}
	}

	const handleUnfollow = async () => {
		const isNotFollowed = await unfollowUser(userId, userDetailsId)
		if (isNotFollowed) {
			setIsFollowed(false)
		}
	}
	return (
		<>
			{isFollowed ? (
				<CustomButton fullWidth onClick={handleUnfollow}>
					Followed
				</CustomButton>
			) : (
				<CustomButton fullWidth onClick={handleFollow}>
					Follow
				</CustomButton>
			)}
		</>
	)
}

export default FollowButton
