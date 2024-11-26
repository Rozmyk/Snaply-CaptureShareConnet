import { Dispatch, SetStateAction } from 'react'
import { Text, Flex, Anchor, useMantineColorScheme, Box } from '@mantine/core'
import ShowUserDetails from '../../ShowUserDetails/ShowUserDetails'
import HighlightText from '../../HighlightText.tsx/HighlightText'
import getTimeDifference from '../../../utils/getTimeDifference'
import Link from 'next/link'
import Likes from '../../Likes/Likes'
import SingleCommentDetailsSettings from '../SingleCommentDetailsSettings/SingleCommentDetailsSettings'
import { Timestamp } from 'firebase-admin/firestore'
import { ReplyToCommentProps } from '../../../types'

interface CommentContentProps {
	username: string
	content: string
	createdAt: Timestamp
	hovered: boolean
	maxWidth: number
	postId: string
	addedBy: string
	commentId: string
	commentLikes: string[]
	mentionedUsers: string[] | null
	mentionedTags: string[] | null
	setReplyData: Dispatch<SetStateAction<ReplyToCommentProps | null>>
}
const CommentContent = ({
	setReplyData,
	commentLikes,
	addedBy,
	username,
	hovered,
	createdAt,
	content,
	mentionedUsers,
	postId,
	commentId,
	maxWidth,
	mentionedTags,
}: CommentContentProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Box maw={maxWidth}>
			<Text fz='sm' sx={{ maxWidth: maxWidth, overflowWrap: 'break-word' }}>
				<ShowUserDetails userDetailsId={addedBy}>
					<Text
						fz='sm'
						color={dark ? '#f5f5f5' : '#262626'}
						fw={700}
						mr='5px'
						component={Link}
						href={`/profile/${username}`}>
						{`${username} `}
					</Text>
				</ShowUserDetails>

				<HighlightText mentionedUsers={mentionedUsers} mentionedTags={mentionedTags} text={content}></HighlightText>
			</Text>
			<Flex mt='xs' direction='row' justify='flex-start' align='center' gap='sm'>
				<Text color={dark ? '#a8a8a8' : '#737373'} fz='xs'>
					{getTimeDifference(createdAt)}
				</Text>
				{commentLikes && commentLikes.length > 0 && (
					<Likes isGray={true} size='xs' fontWeight={400} likes={commentLikes}></Likes>
				)}
				<Anchor
					style={{ color: dark ? '#a8a8a8' : '#737373' }}
					fz='xs'
					onClick={() => {
						setReplyData({
							isReplied: true,
							replyUserId: addedBy,
							replyUsername: username,
							postId: postId,
							commentId: commentId,
						})
					}}>
					Reply
				</Anchor>
				{hovered && <SingleCommentDetailsSettings dark={dark} />}
			</Flex>
		</Box>
	)
}

export default CommentContent
