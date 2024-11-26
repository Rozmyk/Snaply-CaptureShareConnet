import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { SingleStoryProps } from '../../types'
const getStoryById = async (userId: string, storyId: string) => {
	try {
		const storyRef = doc(db, 'users', userId, 'stories', storyId)
		const storySnap = await getDoc(storyRef)

		if (storySnap.exists()) {
			const singleStory = {
				id: storySnap.id,
				...storySnap.data(),
			}
			return singleStory as SingleStoryProps
		} else {
			console.log('No such document!')
			return null
		}
	} catch (error) {
		console.error('Error fetching document: ', error)
	}
}

export default getStoryById
