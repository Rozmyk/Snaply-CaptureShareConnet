import { Box, Group } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import LikeButton from './Buttons/LikeButton/LikeButton'
import CommentButton from './Buttons/CommentButton/CommentButton'
import ShareButton from './Buttons/ShareButton/ShareButton'
import SaveButton from './Buttons/SaveButton/SaveButton'
interface PostActionProps {
	isLiked: boolean
	isSaved: boolean
	postId: string
	userId: string
	setIsSaved: Dispatch<SetStateAction<boolean>>
	addLikeToPost: () => void
	removeLikeFromPost: () => void
}

const PostAction = ({
	isLiked,
	isSaved,
	postId,
	userId,
	setIsSaved,
	addLikeToPost,
	removeLikeFromPost,
}: PostActionProps) => {
	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '4px',
					marginBottom: '4px',
				}}>
				<Group spacing='none'>
					<LikeButton isLiked={isLiked} addLikeToPost={addLikeToPost} removeLikeFromPost={removeLikeFromPost} />
					<CommentButton postId={postId} />
					<ShareButton postId={postId} />
				</Group>
				<SaveButton isSaved={isSaved} userId={userId} postId={postId} setIsSaved={setIsSaved} />
			</Box>
		</>
	)
}

export default PostAction
