'use client'
import { useState, useEffect } from 'react'
import { onSnapshot, collection, where, query } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { getSingleCommentData } from '../../../utils/post/getSingleCommentData'
import { Anchor, useMantineColorScheme } from '@mantine/core'
import SingleLastComment from '../SingleLastComment/SingleLastComment'
import { SingleDownloadedCommentProps } from '../../../types'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'
interface PostCommentsProps {
	comments: number
	postId: string
}

const PostComments = ({ comments, postId }: PostCommentsProps) => {
	const [lastComments, setLastComments] = useState<SingleDownloadedCommentProps[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'posts', postId, 'comments'), where('createdAt', '>', new Date())),
			async snapshot => {
				snapshot.docChanges().forEach(async change => {
					if (change.type === 'added') {
						const commentToAdd = (await getSingleCommentData(postId, change.doc.id)) as SingleDownloadedCommentProps
						setLastComments(prevComments => [commentToAdd, ...prevComments])
						setLoading(false)
					}
				})
			}
		)
		return () => unsubscribe()
	}, [postId])

	return (
		<>
			{comments >= 1 && (
				<Link href={isSmallScreen ? `post/${postId}/comments` : `post/${postId}`} style={{ textDecoration: 'none' }}>
					<Anchor size='sm' color={dark ? '#a8a8a8' : '#737373'}>
						View all {comments} comments
					</Anchor>
				</Link>
			)}
			{!loading &&
				lastComments.length > 0 &&
				lastComments
					.slice(0, 2)
					.map(comment => (
						<SingleLastComment
							mentionedUsers={comment.mentionedUsers}
							mentionedTags={comment.mentionedTags}
							username={comment.userDetails.username}
							commentId={comment.id}
							text={comment.text}
							postId={postId}
							key={comment.id}
						/>
					))}
		</>
	)
}

export default PostComments
