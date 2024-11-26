import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const toggleViewedMessage = async (chatId: string, messageId: string, userId: string) => {
	try {
		const notificationRef = doc(db, 'chats', chatId, 'messages', messageId)
		await updateDoc(notificationRef, {
			viewedBy: arrayUnion(userId),
		})
		console.log('Notification viewed successfully.')
	} catch (error) {
		console.error('Error updating notification:', error)
	}
}
