import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const checkIfUserLikedReplies = async (postId: string, commentId: string, userId: string, repliesId: string) => {
	try {
		const commentRef = doc(db, 'posts', postId, 'comments', commentId, 'replies', repliesId)
		const commentDoc = await getDoc(commentRef)

		if (commentDoc.exists()) {
			const commentData = commentDoc.data()
			const likes = commentData.likes || []
			return likes.includes(userId)
		} else {
			console.log('replies not found')
			return false
		}
	} catch (error) {
		console.error('Error checking if user liked replies:', error)
		return false
	}
}
