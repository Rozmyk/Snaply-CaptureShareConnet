import { Dispatch, SetStateAction } from 'react'
import { likePost } from '../../../../../utils/post/likePost'
import { unlikePost } from '../../../../../utils/post/unlikePost'
import { Tooltip, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
interface LikeButtonProps {
	setUserLiked: Dispatch<SetStateAction<boolean>>
	userLiked: boolean
	userId: string
	postId: string
	addedBy: string
	postImage: string
}
const LikeButton = ({ setUserLiked, userLiked, userId, postId, addedBy, postImage }: LikeButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Tooltip label='Like' position='bottom-end'>
			{userLiked ? (
				<Tooltip label='Unlike' position='bottom-end'>
					<ActionIcon
						size='lg'
						onClick={async () => {
							const isUnliked = await unlikePost(userId, postId)
							if (isUnliked) {
								setUserLiked(false)
							}
						}}>
						<IconHeartFilled style={{ color: '#FF3040' }}></IconHeartFilled>
					</ActionIcon>
				</Tooltip>
			) : (
				<Tooltip label='Like' position='bottom-end'>
					<ActionIcon
						size='lg'
						onClick={async () => {
							const isLiked = await likePost(userId, addedBy, { postId, postImage: postImage })
							if (isLiked) {
								setUserLiked(true)
							}
						}}>
						<IconHeart style={{ color: dark ? 'white' : 'black' }}></IconHeart>
					</ActionIcon>
				</Tooltip>
			)}
		</Tooltip>
	)
}

export default LikeButton
