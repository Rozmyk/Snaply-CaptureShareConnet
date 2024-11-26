import { ScrollArea } from '@mantine/core'
import SingleCommentDetails from '../../../../SingleCommentDetails/SingleCommentDetails'
import { Dispatch, SetStateAction } from 'react'
import { ReplyToCommentProps, SingleDownloadedCommentProps } from '../../../../../types'
interface CommentsContentProps {
	comments: SingleDownloadedCommentProps[]
	postId: string
	width: number
	height: number
	setReplyData: Dispatch<SetStateAction<ReplyToCommentProps | null>>
}
const CommentsContent = ({ comments, postId, width, setReplyData, height }: CommentsContentProps) => {
	return (
		<ScrollArea h={height}>
			{comments.map(comment => (
				<SingleCommentDetails
					username={comment.userDetails.username}
					content={comment.text}
					userImage={comment.userDetails.image}
					createdAt={comment.createdAt}
					commentId={comment.id}
					postId={postId}
					mentionedUsers={comment.mentionedUsers}
					mentionedTags={comment.mentionedTags}
					addedBy={comment.user}
					commentLikes={comment.likes}
					replies={comment.replies}
					maxWidth={width}
					key={comment.id}
					setReplyData={setReplyData}
				/>
			))}
		</ScrollArea>
	)
}

export default CommentsContent
