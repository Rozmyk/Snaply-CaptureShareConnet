import { Text, Flex, Anchor, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link'
import getTimeDifference from '../../../../utils/getTimeDifference'
import { Timestamp } from 'firebase-admin/firestore'
import HighlightText from '../../../HighlightText.tsx/HighlightText'
import Likes from '../../../Likes/Likes'
interface CommentContentProps {
	username: string
	content: string
	createdAt: Timestamp
	commentLikes?: string[]
	mentionedTags: string[]
	mentionedUsers: string[]
}
const CommentContent = ({
	username,
	content,
	createdAt,
	commentLikes,
	mentionedTags,
	mentionedUsers,
}: CommentContentProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<>
			<Text fz='sm' sx={{ wordWrap: 'break-word' }}>
				<Text fz='sm' color={dark ? 'white' : 'black'} fw={700} component={Link} href={`/profile/${username}`}>
					{`${username}: `}
				</Text>
				<HighlightText text={content} mentionedTags={mentionedTags} mentionedUsers={mentionedUsers} />
			</Text>
			<Flex mt='xs' direction='row' justify='flex-start' align='center' gap='sm'>
				<Text color={dark ? '#737373' : '#a8a8a8'} fz='xs'>
					{getTimeDifference(createdAt)}
				</Text>
				{commentLikes && commentLikes.length > 0 && (
					<Likes isGray size='xs' fontWeight={400} likes={commentLikes}></Likes>
				)}
				<Anchor color={dark ? '#737373' : '#a8a8a8'} fz='xs'>
					Reply
				</Anchor>
			</Flex>
		</>
	)
}

export default CommentContent
