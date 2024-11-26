import { db } from '@/app/firebase'
import { updateDoc, doc } from 'firebase/firestore'

export const hideComments = async (postId: string) => {
	try {
		const postRef = doc(db, 'posts', postId)
		await updateDoc(postRef, {
			turnOffComments: true,
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
export const showComments = async (postId: string) => {
	try {
		const postRef = doc(db, 'posts', postId)
		await updateDoc(postRef, {
			turnOffComments: false,
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
