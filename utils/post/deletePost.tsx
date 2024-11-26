import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const deletePost = async (postId: string) => {
	try {
		await deleteDoc(doc(db, 'posts', postId))
	} catch (error) {
		console.log(error)
	}
}
