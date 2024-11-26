import { Stack } from '@mantine/core'
import { deletePost } from '../../../utils/post/deletePost'
import DeletePostButton from './DeletePostButton/DeletePostButton'
import ToggleLikeCount from './ToggleLikeCount/ToggleLikeCount'
import ToggleComment from './ToggleComment/ToggleComment'
import RegularButton from '../RegularButton/RegularButton'
import CopyLinkButton from '../CopyLinkButton/CopyLinkButton'
interface AuthorActionsProps {
	dark: boolean
	turnOffComments: boolean
	hideLikes: boolean
	postId: string
	close: () => void
}
const AuthorActions = ({ dark, turnOffComments, hideLikes, postId, close }: AuthorActionsProps) => {
	const handleDeletePost = () => {
		deletePost(postId)
		close()
	}
	return (
		<Stack spacing='none'>
			<DeletePostButton dark={dark} onClick={handleDeletePost} />
			<RegularButton disabled>Archive</RegularButton>
			<ToggleLikeCount hideLikes={hideLikes} postId={postId} />
			<ToggleComment turnOffComments={turnOffComments} postId={postId}></ToggleComment>
			<RegularButton disabled>Edit</RegularButton>
			<CopyLinkButton postId={postId} />
			<RegularButton onClick={close}>Cancel</RegularButton>
		</Stack>
	)
}

export default AuthorActions
