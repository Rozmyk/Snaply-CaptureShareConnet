'use client'
import UserAvatar from '../../UserAvatar/UserAvatar'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Flex, Grid, Container } from '@mantine/core'
import { checkIfUserLikedReplies } from '../../../utils/post/checkIfUserLikedReplies'
import LikeButton from './LikeButton/LikeButton'
import CommentContent from './CommentContent/CommentContent'
import { Timestamp } from 'firebase-admin/firestore'
import SingleCommentWithoutRepliesLoading from './SingleCommentWithoutRepliesLoading/SingleCommentWithoutRepliesLoading'
interface SingleCommentWithoutRepliesProps {
	username: string
	mentionedTags: string[]
	mentionedUsers: string[]
	content: string
	userImage: string
	createdAt: Timestamp
	commentId: string
	repliesId: string
	postId: string
	commentLikes?: string[]
}
const SingleCommentWithoutReplies = ({
	username,
	content,
	userImage,
	createdAt,
	commentLikes,
	commentId,
	repliesId,
	postId,
	mentionedTags,
	mentionedUsers,
}: SingleCommentWithoutRepliesProps) => {
	const session = useSession()
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [likeLoading, setLikeLoading] = useState<boolean>(true)

	const userId = session.data?.user?.id
	useEffect(() => {
		const fetchIsLikedStatus = async () => {
			if (userId) {
				const userLikedReplies = await checkIfUserLikedReplies(postId, commentId, userId, repliesId)
				setIsLiked(userLikedReplies)
				setLikeLoading(false)
			}
		}

		fetchIsLikedStatus()
	}, [postId, commentId, userId, repliesId])

	return likeLoading ? (
		<SingleCommentWithoutRepliesLoading />
	) : (
		<Container>
			<Grid p='sm'>
				<Grid.Col span={2}>
					<Flex justify='flex-end'>
						<UserAvatar size={35} src={userImage} alt={`${username} profile photo`}></UserAvatar>
					</Flex>
				</Grid.Col>
				<Grid.Col span={9}>
					<CommentContent
						mentionedUsers={mentionedUsers}
						mentionedTags={mentionedTags}
						username={username}
						content={content}
						createdAt={createdAt}
						commentLikes={commentLikes}
					/>
				</Grid.Col>
				<Grid.Col span={1}>
					<Flex justify='center'>
						{userId && (
							<LikeButton
								isLiked={isLiked}
								setIsLiked={setIsLiked}
								postId={postId}
								commentId={commentId}
								userId={userId}
								repliesId={repliesId}
							/>
						)}
					</Flex>
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export default SingleCommentWithoutReplies
