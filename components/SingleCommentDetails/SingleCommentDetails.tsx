'use client'
import UserAvatar from '../UserAvatar/UserAvatar'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useHover, useElementSize } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import { Flex, Box } from '@mantine/core'
import { checkIfUserLikedComment } from '../../utils/post/checkIfUserLikedComment'
import ShowUserDetails from '../ShowUserDetails/ShowUserDetails'
import CommentContent from './CommentContent/CommentContent'
import CommentReplies from './CommentReplies/CommentReplies'
import LikeButton from './LikeButton/LikeButton'
import { Timestamp } from 'firebase-admin/firestore'
import { ReplyToCommentProps, DownloadCommentRepliesProps } from '../../types'
interface SingleCommentDetailsProps {
	username: string
	content: string
	userImage: string
	createdAt: Timestamp
	maxWidth: number
	postId: string
	addedBy: string
	commentId: string
	commentLikes: string[]
	mentionedUsers: string[] | null
	replies?: DownloadCommentRepliesProps[]
	mentionedTags: string[] | null
	setReplyData: Dispatch<SetStateAction<ReplyToCommentProps | null>>
}
const SingleCommentDetails = ({
	username,
	content,
	userImage,
	createdAt,
	commentLikes,
	replies,
	commentId,
	postId,
	mentionedUsers,
	mentionedTags,
	addedBy,
	setReplyData,
	maxWidth,
}: SingleCommentDetailsProps) => {
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [showReplies, setShowReplies] = useState<boolean>(false)

	const session = useSession()
	const userId = session.data?.user?.id
	const { hovered, ref } = useHover()

	const { ref: userPhotoRef, width: userPhotoWidth } = useElementSize()
	const { ref: LikeButtonRef, width: LikeButtonWidth } = useElementSize()
	useEffect(() => {
		const fetchIsLikedStatus = async () => {
			if (userId) {
				const userLikedComment = await checkIfUserLikedComment(postId, commentId, userId)

				setIsLiked(userLikedComment)
			}
		}

		fetchIsLikedStatus()
	}, [postId, commentId, userId])

	return (
		<Box maw={maxWidth} mb='md' mt='md'>
			<Flex ref={ref} justify='space-between' align='flex-start' w='100%' pr='sm' pl='sm'>
				<Flex justify='center' align='flex-start'>
					<Box ref={userPhotoRef} mr='sm'>
						<ShowUserDetails userDetailsId={addedBy}>
							<UserAvatar size={35} src={userImage} alt={`${username} profile photo`}></UserAvatar>
						</ShowUserDetails>
					</Box>
					<Flex direction='column'>
						<CommentContent
							mentionedTags={mentionedTags}
							maxWidth={maxWidth - userPhotoWidth - LikeButtonWidth - 50}
							setReplyData={setReplyData}
							commentLikes={commentLikes}
							addedBy={addedBy}
							username={username}
							hovered={hovered}
							createdAt={createdAt}
							content={content}
							mentionedUsers={mentionedUsers}
							postId={postId}
							commentId={commentId}
						/>
					</Flex>
				</Flex>

				<Flex ref={LikeButtonRef}>
					<LikeButton isLiked={isLiked} setIsLiked={setIsLiked} postId={postId} commentId={commentId} userId={userId} />
				</Flex>
			</Flex>
			<CommentReplies
				marginLeft={userPhotoWidth}
				showReplies={showReplies}
				setShowReplies={setShowReplies}
				commentReplies={replies}
				commentId={commentId}
				postId={postId}
			/>
		</Box>
	)
}

export default SingleCommentDetails
