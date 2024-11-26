import { db } from '@/app/firebase'
import { getDoc, doc } from 'firebase/firestore'
export const checkIfUserSavedPost = async (userId: string, postId: string) => {
	const userRef = doc(db, 'users', userId)

	try {
		const userSnapshot = await getDoc(userRef)

		if (userSnapshot.exists()) {
			const userData = userSnapshot.data()
			const savedPosts = userData.savedPosts || []

			const isSaved = savedPosts.includes(postId)
			return isSaved
		}
		return false
	} catch (error) {
		console.log(error)
		return false
	}
}
