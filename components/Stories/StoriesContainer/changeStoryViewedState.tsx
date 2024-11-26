import { db } from '@/app/firebase'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'

export const changeStoryViewedState = async (addedBy: string, storyId: string, userId: string) => {
	try {
		const storyRef = doc(db, 'users', addedBy, 'stories', storyId)
		await updateDoc(storyRef, {
			viewedBy: arrayUnion(userId),
		})
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
