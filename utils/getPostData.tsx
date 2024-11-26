import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { PostProps } from '../types'

export const getPostData = async (postId: string): Promise<PostProps | null> => {
	try {
		const postRef = doc(db, 'posts', postId)
		const docSnap = await getDoc(postRef)

		if (docSnap.exists()) {
			const postData = docSnap.data() as PostProps

			return { ...postData, id: postId }
		} else {
			console.log('Document does not exist')
			return null
		}
	} catch (error) {
		console.error('Error fetching post data:', error)
		return null
	}
}
