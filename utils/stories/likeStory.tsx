import { db } from '@/app/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export const likeStory = async (userId: string, addedBy: string, storyId: string): Promise<boolean> => {
	try {
		const storyRef = doc(db, 'users', userId, 'stories', storyId)
		await updateDoc(storyRef, {
			likes: arrayUnion(addedBy),
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
