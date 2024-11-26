import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const likeComment = async (postId: string, commentId: string, userId: string) => {
	try {
		const commentRef = doc(db, 'posts', postId, 'comments', commentId)
		await updateDoc(commentRef, { likes: arrayUnion(userId) })

		return true
	} catch (error) {
		console.error('Error adding like:', error)
		return false
	}
}
