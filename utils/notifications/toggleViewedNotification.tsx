import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const toggleViewedNotification = async (notificationId: string, userId: string) => {
	try {
		const notificationRef = doc(db, 'users', userId, 'notifications', notificationId)
		await updateDoc(notificationRef, { viewed: true })
		console.log('Notification viewed successfully.')
	} catch (error) {
		console.error('Error updating notification:', error)
	}
}
