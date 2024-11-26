import { db } from '@/app/firebase'
import { updateDoc, doc } from 'firebase/firestore'

export const hideLikeCount = async (postId: string) => {
	try {
		const postRef = doc(db, 'posts', postId)
		await updateDoc(postRef, {
			hideLikes: true,
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
export const showLikeCount = async (postId: string) => {
	try {
		const postRef = doc(db, 'posts', postId)
		await updateDoc(postRef, {
			hideLikes: false,
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
