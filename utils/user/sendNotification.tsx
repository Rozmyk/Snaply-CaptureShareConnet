import { db } from '@/app/firebase'
import { collection, addDoc } from 'firebase/firestore'
interface optionsProps {
	content?: string
	post?: {
		postId: string
		postImage: string
	}
}
export const sendNotification = async (addedBy: string, userId: string, type: string, options?: optionsProps) => {
	try {
		if (userId !== addedBy) {
			const userRef = collection(db, 'users', userId, 'notifications')

			const newNotification = {
				addedBy,
				userId,
				type,
				createdAt: new Date(),
				viewed: false,
				options: options ?? '',
			}

			if (userRef && newNotification) {
				await addDoc(userRef, newNotification)
			}
		}
	} catch (error) {
		console.error('Błąd podczas dodawania użytkownika:', error)
		console.log(error)
	}
}
