import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const unlikeRepliesToComment = async (postId: string, commentId: string, userId: string, repliesId: string) => {
	try {
		const commentRef = doc(db, 'posts', postId, 'comments', commentId, 'replies', repliesId)
		await updateDoc(commentRef, { likes: arrayRemove(userId) })

		return true
	} catch (error) {
		console.error('Error adding like:', error)
		return false
	}
}
