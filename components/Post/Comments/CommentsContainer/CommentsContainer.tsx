'use client'
import { useState, useEffect } from 'react'
import { db } from '@/app/firebase'
import { collection, getDocs, orderBy, query, onSnapshot, where } from 'firebase/firestore'
import { fetchUserData } from '../../../../utils/user/fetchUserData'
import { Container, Divider } from '@mantine/core'
import EmptyComments from '../../../DetailsPost/DetailsComments/EmptyComments/EmptyComments'
import { getPostData } from '../../../../utils/getPostData'
import {
	ReplyToCommentProps,
	PostProps,
	UserProps,
	DownloadCommentRepliesProps,
	SingleDownloadedCommentProps,
} from '../../../../types'
import { getSingleCommentData } from '../../../../utils/post/getSingleCommentData'
import CommentsDescription from './CommentsDescription/CommentsDescription'
import CommentsLoading from './CommentsLoading/CommentsLoading'
import CommentsContent from './CommentsContent/CommentsContent'
import { useElementSize } from '@mantine/hooks'
import AddCommentWithEmoij from '../../../DetailsPost/AddCommentWithEmoij/AddCommentWithEmoij'
interface CommentsContainerProps {
	postId: string
}
const CommentsContainer = ({ postId }: CommentsContainerProps) => {
	const [comments, setComments] = useState<SingleDownloadedCommentProps[]>([])
	const [postData, setPostData] = useState<PostProps | null>(null)
	const [postLoading, setPostLoading] = useState(true)
	const [commentsLoading, setCommentsLoading] = useState(true)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [replyData, setReplyData] = useState<ReplyToCommentProps | null>(null)
	const { ref: containerRef, width: containerWidth, height: containerHeight } = useElementSize()
	const { ref: inputRef, height: inputHeight } = useElementSize()
	const { ref: descriptionRef, height: descriptionHeight } = useElementSize()

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'posts', postId, 'comments'), where('createdAt', '>', new Date())),
			async snapshot => {
				snapshot.docChanges().forEach(async change => {
					if (change.type === 'added') {
						const commentToAdd = (await getSingleCommentData(postId, change.doc.id)) as SingleDownloadedCommentProps
						setComments(prevComments => [commentToAdd, ...prevComments])
					}
				})
			}
		)
		return () => unsubscribe()
	}, [postId])

	useEffect(() => {
		const getAllComments = async () => {
			const commentsRef = collection(db, 'posts', postId, 'comments')
			const sortedQuery = query(commentsRef, orderBy('createdAt', 'desc'))
			const data = await getDocs(sortedQuery)
			let comments = [] as SingleDownloadedCommentProps[]

			for (const doc of data.docs) {
				const commentData = doc.data() as SingleDownloadedCommentProps
				commentData.id = doc.id

				const userData = await fetchUserData(commentData.user)
				if (userData) {
					commentData.userDetails = userData
				}

				const repliesRef = collection(db, 'posts', postId, 'comments', doc.id, 'replies')
				const repliesData = await getDocs(repliesRef)

				if (!repliesData.empty) {
					let replies = [] as DownloadCommentRepliesProps[]
					for (const replyDoc of repliesData.docs) {
						const replyData = replyDoc.data()
						replyData.id = replyDoc.id

						const replyUserData = await fetchUserData(replyData.user)
						replyData.userDetails = replyUserData

						replies.push({
							...replyData,
							createdAt: replyData.createdAt || new Date(),
							mentionedTags: replyData.mentionedTags || [],
							mentionedUsers: replyData.mentionedUsers || [],
							text: replyData.text || '',
							user: replyData.user || '',
							userDetails: replyData.userDetails || '',
							id: replyData.id || '',
						} as DownloadCommentRepliesProps)
					}
					commentData.replies = replies
				}

				comments.push(commentData)
			}

			setComments(comments)
			setCommentsLoading(false)
		}
		const fetchPostData = async () => {
			const fetchedData = await getPostData(postId)
			if (fetchedData) {
				setPostData(fetchedData)
				const fetchedUserData = await fetchUserData(fetchedData.addedBy)
				if (fetchedUserData) {
					setUserData(fetchedUserData)
				}
			}
			setPostLoading(false)
		}
		getAllComments()
		fetchPostData()
	}, [postId])
	return (
		<Container
			p='0'
			style={{ maxHeight: '100vh', height: '100vh', maxWidth: '100%', margin: 0, overflow: 'hidden' }}
			ref={containerRef}>
			<div ref={descriptionRef}>
				<CommentsDescription postData={postData} userData={userData} width={containerWidth} postLoading={postLoading} />
				<Divider />
			</div>

			{commentsLoading ? (
				<CommentsLoading />
			) : comments && comments.length > 0 ? (
				<div style={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
					<CommentsContent
						height={containerHeight - inputHeight - descriptionHeight}
						comments={comments}
						postId={postId}
						width={containerWidth}
						setReplyData={setReplyData}
					/>
				</div>
			) : (
				<EmptyComments />
			)}
			<div ref={inputRef} style={{ height: 100, maxWidth: '100%', width: '100%', padding: '5px' }}>
				<Divider />
				{postData && (
					<AddCommentWithEmoij
						postData={postData}
						replyData={replyData}
						setReplyData={setReplyData}
						maxWidth={containerWidth}
					/>
				)}
			</div>
		</Container>
	)
}

export default CommentsContainer
