import { db } from '@/app/firebase'
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore'
import getRepliesData from './post/getRepliesData'
import { fetchUserData } from './user/fetchUserData'
import { DownloadCommentRepliesProps, SingleDownloadedCommentProps } from '../types'
import { Timestamp } from 'firebase-admin/firestore'
export default {
	async commentsFirstBatch(postId: string) {
		try {
			const commentsRef = collection(db, 'posts', postId, 'comments')
			const sortedQuery = query(commentsRef, orderBy('createdAt', 'desc'), limit(10))
			const data = await getDocs(sortedQuery)

			let comments: SingleDownloadedCommentProps[] = []
			let lastKey: Timestamp | null = null

			for (const doc of data.docs) {
				const commentData = doc.data() as SingleDownloadedCommentProps
				commentData.id = doc.id
				commentData.replies = (await getRepliesData(postId, doc.id)) as DownloadCommentRepliesProps[]

				if (commentData.user) {
					const userData = await fetchUserData(commentData.user)
					if (userData) {
						commentData.userDetails = userData
						comments.push(commentData)
					}
				}

				lastKey = commentData.createdAt
			}
			console.log(comments)

			return { comments, lastKey }
		} catch (error) {
			console.error(error)
		}
	},

	async commentsNextBatch(postId: string, key: Timestamp | null) {
		try {
			const commentsRef = collection(db, 'posts', postId, 'comments')
			const sortedQuery = query(commentsRef, orderBy('createdAt', 'desc'), limit(10), startAfter(key))
			const data = await getDocs(sortedQuery)

			let comments: SingleDownloadedCommentProps[] = []
			let lastKey: Timestamp | null = null

			for (const doc of data.docs) {
				const commentData = doc.data() as SingleDownloadedCommentProps
				commentData.id = doc.id
				commentData.replies = await getRepliesData(postId, doc.id)

				if (commentData.user) {
					const userData = await fetchUserData(commentData.user)
					if (userData) {
						commentData.userDetails = userData
						comments.push(commentData)
					}
				}

				lastKey = commentData.createdAt
			}

			return { comments, lastKey }
		} catch (error) {
			console.error(error)
		}
	},
}
