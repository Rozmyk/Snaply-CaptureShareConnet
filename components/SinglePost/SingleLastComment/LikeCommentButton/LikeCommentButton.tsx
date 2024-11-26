'use client'
import { Tooltip, ActionIcon } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { likeComment } from '../../../../utils/post/likeComment'
import { unlikeComment } from '../../../../utils/post/unlikeComment'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
interface LikCommentButtonProps {
	alreadyIsLiked: boolean
	setAlreadyIsLiked: Dispatch<SetStateAction<boolean>>
	postId: string
	commentId: string
}
const LikeCommentButton = ({ alreadyIsLiked, setAlreadyIsLiked, postId, commentId }: LikCommentButtonProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id
	const addLikeToComment = async (postId: string, commentId: string, userId: string) => {
		const isLiked = await likeComment(postId, commentId, userId)
		if (isLiked) {
			setAlreadyIsLiked(true)
		}
	}
	const removeLikeFromComment = async (postId: string, commentId: string, userId: string) => {
		const isUnliked = await unlikeComment(postId, commentId, userId)
		if (isUnliked) {
			setAlreadyIsLiked(false)
		}
	}
	return (
		<Tooltip label={alreadyIsLiked ? 'Unlike' : 'Like'} position='right-end'>
			<ActionIcon
				onClick={() => {
					alreadyIsLiked
						? removeLikeFromComment(postId, commentId, userId ?? '')
						: addLikeToComment(postId, commentId, userId ?? '')
				}}>
				{alreadyIsLiked ? (
					<IconHeartFilled style={{ color: '#FF3040' }} size={13} />
				) : (
					<IconHeart color='#A8A8A8' size={13} />
				)}
			</ActionIcon>
		</Tooltip>
	)
}

export default LikeCommentButton
