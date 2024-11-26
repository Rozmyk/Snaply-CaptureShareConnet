import { Stack, Button, Sx } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import { followUser } from '../../../utils/followUser'
import RegularButton from '../RegularButton/RegularButton'
import CopyLinkButton from '../CopyLinkButton/CopyLinkButton'
import FollowButtton from './FollowButton/FollowButton'
import UnfollowButton from './UnfollowButton/UnfollowButton'
import SavePostButton from './SavePostButton/SavePostButton'
import ReportButton from './ReportButton/ReportButton'
import GoToPostButton from './GoToPostButton/GoToPostButton'
interface ViewerActionsProps {
	isFollowed: boolean
	postId: string
	addedBy: string
	setIsFollowed: Dispatch<SetStateAction<boolean>>
	close: () => void
}
const ViewerActions = ({ isFollowed, postId, setIsFollowed, addedBy }: ViewerActionsProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id

	return (
		<Stack spacing='none' w={'100%'}>
			<ReportButton />

			{isFollowed
				? userId && <UnfollowButton userId={userId} addedBy={addedBy} setIsFollowed={setIsFollowed}></UnfollowButton>
				: userId && <FollowButtton userId={userId} addedBy={addedBy} setIsFollowed={setIsFollowed}></FollowButtton>}
			<SavePostButton />

			<GoToPostButton postId={postId} />
			<CopyLinkButton postId={postId} />
			<RegularButton onClick={close}>Close</RegularButton>
		</Stack>
	)
}

export default ViewerActions
