import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'

interface LikeButtonProps {
	isLiked: boolean
	addLikeToPost: () => void
	removeLikeFromPost: () => void
}
const LikeButton = ({ isLiked, addLikeToPost, removeLikeFromPost }: LikeButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Tooltip label={isLiked ? 'Unlike' : 'Like'} position='bottom-end'>
			<ActionIcon size='lg' onClick={isLiked ? removeLikeFromPost : addLikeToPost}>
				{isLiked ? (
					<IconHeartFilled style={{ color: '#fe3140' }} />
				) : (
					<IconHeart style={{ color: dark ? 'white' : 'black' }} />
				)}
			</ActionIcon>
		</Tooltip>
	)
}

export default LikeButton
