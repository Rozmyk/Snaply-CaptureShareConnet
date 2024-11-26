import { db } from '@/app/firebase'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
db

export const savePost = async (userId: string, postId: string): Promise<boolean> => {
	try {
		const userRef = doc(db, 'users', userId)
		await updateDoc(userRef, {
			savedPosts: arrayUnion(postId),
		})

		return true
	} catch (error) {
		console.error('Error saving post:', error)
		return false
	}
}
