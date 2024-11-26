import { ActionIcon } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { likeComment } from '../../../utils/post/likeComment'
import { unlikeComment } from '../../../utils/post/unlikeComment'
import { SetStateAction, Dispatch } from 'react'
interface LikeButtonProps {
	isLiked: boolean
	setIsLiked: Dispatch<SetStateAction<boolean>>
	postId: string
	commentId: string
	userId: string | undefined
}
const LikeButton = ({ isLiked, setIsLiked, postId, commentId, userId }: LikeButtonProps) => {
	return isLiked ? (
		<ActionIcon
			size='md'
			onClick={async () => {
				if (userId) {
					const isUnliked = await unlikeComment(postId, commentId, userId)
					if (isUnliked) {
						setIsLiked(false)
					}
				}
			}}>
			<IconHeartFilled size='1.125rem' style={{ color: '#FF3040' }}></IconHeartFilled>
		</ActionIcon>
	) : (
		<ActionIcon
			size='md'
			onClick={async () => {
				if (userId) {
					const isLiked = await likeComment(postId, commentId, userId)
					if (isLiked) {
						setIsLiked(true)
					}
				}
			}}>
			<IconHeart size='1.125rem'></IconHeart>
		</ActionIcon>
	)
}

export default LikeButton
