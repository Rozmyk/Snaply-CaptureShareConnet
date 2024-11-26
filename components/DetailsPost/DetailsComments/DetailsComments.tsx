'use client'
import { Box, Flex, ScrollArea, Loader } from '@mantine/core'
import { useState, useEffect, Dispatch, SetStateAction, RefObject } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import SingleCommentDetails from '../../SingleCommentDetails/SingleCommentDetails'
import commentService from '../../../utils/commentService'
import { useRef } from 'react'
import { useElementSize } from '@mantine/hooks'
import { query, where } from 'firebase/firestore'
import { getSingleCommentData } from '../../../utils/post/getSingleCommentData'
import { db } from '@/app/firebase'
import DetailsDescription from '../DetailsDescription/DetailsDescription'
import DetailsCommentsLoading from './DetailsCommentsLoading/DetailsCommentsLoading'
import EmptyComments from './EmptyComments/EmptyComments'
import { ReplyToCommentProps, DescriptionDataProps, SingleDownloadedCommentProps } from '../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface DetailsCommentsProps {
	postId: string
	height: number
	setReplyData: Dispatch<SetStateAction<ReplyToCommentProps | null>>
	descriptionData: DescriptionDataProps
}

interface FetchedComments {
	comments: SingleDownloadedCommentProps[]
	lastKey: Timestamp | null
}
const DetailsComments = ({ postId, setReplyData, descriptionData, height }: DetailsCommentsProps) => {
	const [loadingComments, setLoadingComments] = useState<boolean>(true)
	const [loader, setLoader] = useState<boolean>(false)
	const [lastKey, setLastKey] = useState<Timestamp | null>(null)
	const [commentsData, setCommentsData] = useState<SingleDownloadedCommentProps[]>([])
	const viewport = useRef<HTMLDivElement>(null)
	const { ref: containerRef, width: containerWidth } = useElementSize()

	const getNextComments = async () => {
		try {
			if (!lastKey) {
				console.log('No more comments to load')
				return
			}

			setLoader(true)
			const fetchedComments: FetchedComments | undefined = await commentService.commentsNextBatch(postId, lastKey)

			if (fetchedComments) {
				setCommentsData(prevState => (prevState ?? []).concat(fetchedComments.comments))
				setLastKey(fetchedComments.lastKey)
			}

			setLoader(false)
		} catch (error) {
			console.log(error)
			setLoader(false)
		}
	}
	const onScrollPositionChange = (viewport: RefObject<HTMLDivElement>) => {
		if (viewport.current) {
			const isAtBottom = viewport.current.scrollTop >= viewport.current.scrollHeight - viewport.current?.offsetHeight

			if (isAtBottom && !loader) {
				getNextComments()
			}
		}
	}

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'posts', postId, 'comments'), where('createdAt', '>', new Date())),
			async snapshot => {
				snapshot.docChanges().forEach(async change => {
					if (change.type === 'added') {
						const commentToAdd = await getSingleCommentData(postId, change.doc.id)
						if (commentToAdd) {
							setCommentsData(prevComments => [commentToAdd as SingleDownloadedCommentProps, ...prevComments])
						}
					}
				})
			}
		)
		return () => unsubscribe()
	}, [postId])
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'posts', postId, 'comments'), async snapshot => {
			snapshot.docChanges().forEach(async change => {
				if (change.type === 'modified') {
					try {
						const updatedComment = await getSingleCommentData(postId, change.doc.id)

						if (updatedComment) {
							setCommentsData(prevCommentsData =>
								prevCommentsData.map(comment => {
									if (comment.id === change.doc.id) {
										return updatedComment as SingleDownloadedCommentProps
									}
									return comment
								})
							)
						}
					} catch (error) {
						console.error('Error updating comment: ', error)
					}
				}

				if (change.type === 'removed') {
					const commentToDelete = change.doc.id

					if (commentsData) {
						setCommentsData(current => current.filter(comment => comment.id !== commentToDelete))
					}
				}
			})
		})

		return () => unsubscribe()
	}, [commentsData, postId])
	useEffect(() => {
		const getFirstComments = async () => {
			try {
				const fetchedComments = await commentService.commentsFirstBatch(postId)

				if (fetchedComments) {
					setCommentsData(fetchedComments.comments)
					setLastKey(fetchedComments.lastKey)
					setLoadingComments(false)
				}
			} catch (error) {
				console.error(error)
			}
		}
		getFirstComments()
	}, [postId])

	return (
		<Box w={'100%'} ref={containerRef}>
			{loadingComments ? (
				<ScrollArea viewportRef={viewport} h={height} w={'100%'}>
					<DetailsCommentsLoading height={height} />
				</ScrollArea>
			) : (
				<ScrollArea
					viewportRef={viewport}
					h={height}
					w={'100%'}
					onScrollPositionChange={() => {
						onScrollPositionChange
					}}>
					<DetailsDescription maxWidth={containerWidth} descriptionData={descriptionData} />

					{commentsData && commentsData.length === 0 ? (
						<EmptyComments />
					) : (
						<>
							{commentsData &&
								commentsData.map(comment => (
									<SingleCommentDetails
										maxWidth={containerWidth}
										key={comment.id}
										setReplyData={setReplyData}
										postId={postId}
										createdAt={comment.createdAt}
										userImage={comment.userDetails.image}
										commentId={comment.id}
										addedBy={comment.userDetails.id}
										username={comment.userDetails.username}
										content={comment.text}
										commentLikes={comment.likes}
										replies={comment.replies}
										mentionedTags={comment.mentionedTags}
										mentionedUsers={comment.mentionedUsers}
									/>
								))}
						</>
					)}

					{loader && (
						<Flex m='xs' justify='center' align='center'>
							<Loader size='sm' color='gray' />
						</Flex>
					)}
				</ScrollArea>
			)}
		</Box>
	)
}

export default DetailsComments
