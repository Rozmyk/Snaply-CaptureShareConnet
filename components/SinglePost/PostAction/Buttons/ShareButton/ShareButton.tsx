import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import SharePost from '../../../../SharePost/SharePost'

interface ShareButtonProps {
	postId: string
}

const ShareButton = ({ postId }: ShareButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<SharePost postId={postId}>
			<Tooltip label='Send' position='bottom-end'>
				<ActionIcon size='lg'>
					<IconSend style={{ color: dark ? 'white' : 'black' }} />
				</ActionIcon>
			</Tooltip>
		</SharePost>
	)
}

export default ShareButton
