import { updateDoc, arrayUnion, doc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { sendNotification } from '../user/sendNotification'
interface postProps {
	postId: string
	postImage: string
}
export const likePost = async (userId: string, addedBy: string, post: postProps): Promise<boolean> => {
	try {
		const postRef = doc(db, 'posts', post.postId)
		await updateDoc(postRef, {
			likes: arrayUnion(userId),
		})
		sendNotification(userId, addedBy, 'likePost', { post: post })
		return true
	} catch (error) {
		console.error('Error liking post:', error)
		console.log(error)
		return false
	}
}
