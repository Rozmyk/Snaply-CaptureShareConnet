import { Divider, Anchor, Flex, useMantineColorScheme } from '@mantine/core'
import SingleCommentWithoutReplies from '../SingleCommentWithoutReplies/SingleCommentWithoutReplies'
import { Dispatch, SetStateAction } from 'react'
import { DownloadCommentRepliesProps } from '../../../types'
interface CommentRepliesProps {
	showReplies: boolean
	setShowReplies: Dispatch<SetStateAction<boolean>>
	commentReplies?: DownloadCommentRepliesProps[] | null
	commentId: string
	postId: string
	marginLeft: number
}
const CommentReplies = ({
	showReplies,
	setShowReplies,
	commentReplies,
	commentId,
	postId,
	marginLeft,
}: CommentRepliesProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<div style={{ marginLeft: 12 + marginLeft }}>
			{commentReplies && commentReplies.length > 0 && (
				<Flex justify='flex-start' align='center' mb='md' mt='md' gap='md'>
					<Divider color={dark ? '#A8A8A8' : '#737373'} size='sm' w={25} />{' '}
					<Anchor
						fz={12}
						fw={600}
						color={dark ? '#A8A8A8' : '#737373'}
						onClick={() => {
							setShowReplies(!showReplies)
						}}>
						{showReplies ? 'Hide replies' : `View replies (${commentReplies.length})`}
					</Anchor>
				</Flex>
			)}
			{showReplies && commentReplies && (
				<div>
					{commentReplies.map(reply => {
						return (
							<SingleCommentWithoutReplies
								commentLikes={reply.likes}
								key={reply.id}
								mentionedTags={reply.mentionedTags}
								mentionedUsers={reply.mentionedUsers}
								username={reply.userDetails.username}
								content={reply.text}
								userImage={reply.userDetails.image}
								createdAt={reply.createdAt}
								commentId={commentId}
								repliesId={reply.id}
								postId={postId}></SingleCommentWithoutReplies>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default CommentReplies
