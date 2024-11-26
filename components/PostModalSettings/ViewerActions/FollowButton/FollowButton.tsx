import RegularButton from '../../RegularButton/RegularButton'
import { followUser } from '../../../../utils/followUser'
import { Dispatch, SetStateAction } from 'react'
interface FollowButtonProps {
	setIsFollowed: Dispatch<SetStateAction<boolean>>
	addedBy: string
	userId: string
}
const FollowButtton = ({ setIsFollowed, addedBy, userId }: FollowButtonProps) => {
	const handleFollow = async () => {
		const isBeingFollowed = await followUser(userId, addedBy)
		if (isBeingFollowed) {
			setIsFollowed(true)
		}
	}
	return (
		<RegularButton errorVariant onClick={handleFollow}>
			Follow
		</RegularButton>
	)
}

export default FollowButtton
