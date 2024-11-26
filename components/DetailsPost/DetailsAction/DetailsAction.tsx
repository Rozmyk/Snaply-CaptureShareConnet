import { Box, Text, useMantineColorScheme } from '@mantine/core'
import getTimeDifference from '../../../utils/getTimeDifference'
import { useSession } from 'next-auth/react'
import PostInteractionButtons from '../Common/PostInteractionButtons/PostInteractionButtons'
import HiddenLikes from '../../Likes/HiddenLikes/HiddenLikes'
import AddCommentWithEmoij from '../AddCommentWithEmoij/AddCommentWithEmoij'
import DetailsActionLoading from './DetailsActionLoading/DetailsActionLoading'
import DetailsLikes from './DetailsLikes/DetailsLikes'
import { PostProps, ReplyToCommentProps } from '../../../types'
import { Dispatch, SetStateAction } from 'react'
interface DetailsActionProps {
	postData: PostProps
	replyData: ReplyToCommentProps | null
	setReplyData: Dispatch<SetStateAction<ReplyToCommentProps | null>>

	loading: boolean
	postId: string
	maxWidth: number
}

const DetailsAction = ({ postData, replyData, setReplyData, loading, maxWidth, postId }: DetailsActionProps) => {
	const session = useSession()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const userId = session?.data?.user?.id

	return (
		<>
			{loading ? (
				<DetailsActionLoading />
			) : (
				<Box w={'100%'} p='xs' h={150} sx={{ borderTop: `1px solid ${dark ? '#232323' : '#f0ecec'}` }}>
					{userId && (
						<PostInteractionButtons addedBy={postData.addedBy} postData={postData} userId={userId} postId={postId} />
					)}
					{postData.hideLikes ? (
						<HiddenLikes isGray={false} likes={postData.likes} />
					) : (
						userId && (
							<DetailsLikes
								addedBy={postData.addedBy}
								postImage={postData.image}
								userId={userId}
								postId={postId}
								likes={postData.likes}></DetailsLikes>
						)
					)}
					<Text color={dark ? '#737373' : '#a8a8a8'} fz='12px'>
						{postData.createdAt ? getTimeDifference(postData.createdAt) : ''}
					</Text>
					{postData.turnOffComments ? (
						<Text align='center' color={dark ? '#737373' : '#a8a8a8'} fz='sm'>
							Comments of this post have been limited
						</Text>
					) : (
						<div style={{ maxWidth: maxWidth }}>
							<AddCommentWithEmoij
								maxWidth={maxWidth}
								replyData={replyData}
								setReplyData={setReplyData}
								postData={postData}></AddCommentWithEmoij>
						</div>
					)}
				</Box>
			)}
		</>
	)
}

export default DetailsAction
