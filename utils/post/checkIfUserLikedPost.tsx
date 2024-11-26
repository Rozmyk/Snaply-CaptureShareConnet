import { db } from '@/app/firebase'
import { getDoc, doc } from 'firebase/firestore'
export const checkIfUserLikedPost = async (userId: string, postId: string) => {
	const postRef = doc(db, 'posts', postId)

	try {
		const postSnapshot = await getDoc(postRef)

		if (postSnapshot.exists()) {
			const postData = postSnapshot.data()
			const likes = postData.likes || []
			const isLiked = likes.includes(userId)
			return isLiked
		}
		return false
	} catch (error) {
		console.log(error)
		return false
	}
}
