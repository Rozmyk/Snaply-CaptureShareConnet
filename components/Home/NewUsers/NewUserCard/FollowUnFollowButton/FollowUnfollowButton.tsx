import { Anchor, useMantineColorScheme } from '@mantine/core'
import { followUser } from '../../../../../utils/followUser'
import { unfollowUser } from '../../../../../utils/unfollowUser'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import CustomButton from '../../../../CustomButton/CustomButton'

interface FollowUnfollowButtonProps {
	isFollowed: boolean
	setIsFollowed: Dispatch<SetStateAction<boolean>>
	id: string
	filledButton: boolean
}

const FollowUnfollowButton = ({ isFollowed, setIsFollowed, id, filledButton }: FollowUnfollowButtonProps) => {
	const { data: session } = useSession()
	const userId = session?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const addFollow = async (followingId: string) => {
		if (!userId) return
		const addedFollow = await followUser(userId, followingId)
		setIsFollowed(addedFollow)
	}

	const deleteFollow = async (followingId: string) => {
		if (!userId) return
		const removedFollow = await unfollowUser(userId, followingId)
		setIsFollowed(!removedFollow)
	}

	const handleFollowClick = async () => {
		if (isFollowed) {
			await deleteFollow(id)
		} else {
			await addFollow(id)
		}
	}

	return (
		<>
			{filledButton ? (
				isFollowed ? (
					<CustomButton
						style={{ backgroundColor: dark ? '#464746' : '#efeeee', color: dark ? 'white' : 'black' }}
						onClick={handleFollowClick}>
						Following
					</CustomButton>
				) : (
					<CustomButton onClick={handleFollowClick}>Follow</CustomButton>
				)
			) : (
				<Anchor onClick={handleFollowClick} color='#0095f6' fw={700} fz={12}>
					{isFollowed ? 'Following' : 'Follow'}
				</Anchor>
			)}
		</>
	)
}

export default FollowUnfollowButton
