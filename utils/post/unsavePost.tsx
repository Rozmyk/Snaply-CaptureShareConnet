import { db } from '@/app/firebase'
import { updateDoc, doc, arrayRemove } from 'firebase/firestore'
db

export const unsavePost = async (userId: string, postId: string): Promise<boolean> => {
	try {
		const userRef = doc(db, 'users', userId)
		await updateDoc(userRef, {
			savedPosts: arrayRemove(postId),
		})

		return true
	} catch (error) {
		console.error('Error unsaving post:', error)
		return false
	}
}
