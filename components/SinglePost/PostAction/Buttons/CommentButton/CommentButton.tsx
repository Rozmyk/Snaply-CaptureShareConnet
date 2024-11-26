import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconMessageCircle } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'

interface CommentButtonProps {
	postId: string
}

const CommentButton = ({ postId }: CommentButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return (
		<Tooltip label='Comment' position='bottom-end'>
			<Link href={isSmallScreen ? `post/${postId}/comments` : `post/${postId}`} passHref>
				<ActionIcon size='lg' component='a'>
					<IconMessageCircle style={{ color: dark ? 'white' : 'black' }} />
				</ActionIcon>
			</Link>
		</Tooltip>
	)
}

export default CommentButton
