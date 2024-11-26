import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

import { unlikeRepliesToComment } from '../../../../utils/post/unlikeRepliesToComment'
import { likeRepliesToComment } from '../../../../utils/post/likeRepliesToComment'
interface LikeButtonProps {
	isLiked: boolean
	setIsLiked: Dispatch<SetStateAction<boolean>>
	postId: string
	commentId: string
	userId: string
	repliesId: string
}
const LikeButton = ({ isLiked, setIsLiked, postId, commentId, userId, repliesId }: LikeButtonProps) => {
	return isLiked ? (
		<ActionIcon
			size='md'
			onClick={async () => {
				const isUnliked = await unlikeRepliesToComment(postId, commentId, userId, repliesId)
				if (isUnliked) {
					setIsLiked(false)
				}
			}}>
			<IconHeartFilled size='1.125rem' style={{ color: '#FF3040' }}></IconHeartFilled>
		</ActionIcon>
	) : (
		<ActionIcon
			size='md'
			onClick={async () => {
				const isLiked = await likeRepliesToComment(postId, commentId, userId, repliesId)
				if (isLiked) {
					setIsLiked(true)
				}
			}}>
			<IconHeart size='1.125rem'></IconHeart>
		</ActionIcon>
	)
}

export default LikeButton
