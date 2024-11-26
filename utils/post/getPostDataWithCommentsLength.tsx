import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { PostProps } from '../../types'
interface updatedPostProps extends PostProps {
	commentsCount: number
}
export const getPostDataWithCommentsLength = async (postId: string): Promise<updatedPostProps | null> => {
	try {
		const postRef = doc(db, 'posts', postId)
		const docSnap = await getDoc(postRef)

		if (docSnap.exists()) {
			const postData = docSnap.data() as updatedPostProps

			let commentsCount = 0

			const commentsCollectionRef = collection(postRef, 'comments')
			const commentsSnap = await getDocs(commentsCollectionRef)
			commentsCount = commentsSnap.size

			return { ...postData, id: postId, commentsCount }
		} else {
			console.log('Document does not exist')
			return null
		}
	} catch (error) {
		console.error('Error fetching post data:', error)
		return null
	}
}
