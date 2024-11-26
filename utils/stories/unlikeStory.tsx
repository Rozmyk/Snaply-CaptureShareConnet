import { db } from '@/app/firebase'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'

export const unlikeStory = async (userId: string, addedBy: string, storyId: string): Promise<boolean> => {
	try {
		const storyRef = doc(db, 'users', userId, 'stories', storyId)
		await updateDoc(storyRef, {
			likes: arrayRemove(addedBy),
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
