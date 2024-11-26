import { updateDoc, arrayRemove, doc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { deleteLikeNotification } from '../notifications/deleteLikeNotification'

export const unlikePost = async (userId: string, postId: string): Promise<boolean> => {
	try {
		const postRef = doc(db, 'posts', postId)
		await updateDoc(postRef, {
			likes: arrayRemove(userId),
		})
		deleteLikeNotification(userId, 'likePost', userId, postId)
		return true
	} catch (error) {
		console.error('Error liking post:', error)
		return false
	}
}
