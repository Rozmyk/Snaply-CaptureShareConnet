import { db } from '@/app/firebase'
import { collection, addDoc } from 'firebase/firestore'

interface postProps {
	id: string
	addedBy: string
	image: string
}
export const sendCommentNotification = async (addedBy: string, userId: string, content: string, post: postProps) => {
	try {
		const userRef = collection(db, 'users', userId, 'notifications')

		const newNotification = {
			addedBy,
			userId,
			type: 'commentedYourPost',
			options: {
				post: {
					postId: post.id,
					postImage: post.image,
				},
				content,
			},
			createdAt: new Date(),
			viewed: false,
		}

		await addDoc(userRef, newNotification)
	} catch (error) {
		console.error('Błąd podczas dodawania użytkownika:', error)
	}
}
