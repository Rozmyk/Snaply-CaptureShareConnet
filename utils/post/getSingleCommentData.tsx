import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import getRepliesData from './getRepliesData'

import { fetchUserData } from '../user/fetchUserData'

export const getSingleCommentData = async (postId: string, commentId: string) => {
	try {
		const commentRef = doc(db, 'posts', postId, 'comments', commentId)
		const commentDoc = await getDoc(commentRef)

		if (commentDoc.exists()) {
			const commentData = commentDoc.data()
			commentData.id = commentDoc.id

			const repliesPromise = getRepliesData(postId, commentData.id)

			if (commentData.user) {
				const userData = await fetchUserData(commentData.user)
				commentData.userDetails = userData
			}

			const replies = await repliesPromise
			commentData.replies = replies

			return commentData
		} else {
			console.log('Comment not found')
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}
