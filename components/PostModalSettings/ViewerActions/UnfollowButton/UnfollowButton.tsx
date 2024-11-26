import RegularButton from '../../RegularButton/RegularButton'
import { unfollowUser } from '../../../../utils/unfollowUser'
import { Dispatch, SetStateAction } from 'react'
interface UnfollowButtonProps {
	setIsFollowed: Dispatch<SetStateAction<boolean>>
	addedBy: string
	userId: string
}
const UnfollowButton = ({ setIsFollowed, addedBy, userId }: UnfollowButtonProps) => {
	const handleUnfollow = async () => {
		const isBeingUnfollowed = await unfollowUser(userId, addedBy)
		if (isBeingUnfollowed) {
			setIsFollowed(true)
		}
	}
	return (
		<RegularButton errorVariant onClick={handleUnfollow}>
			Unfollow
		</RegularButton>
	)
}

export default UnfollowButton
