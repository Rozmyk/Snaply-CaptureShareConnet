import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
export async function deleteNotification(otherUserId: string, type: string, addedBy: string, postId: string) {
	const notificationsCollection = collection(db, 'users', addedBy, 'notifications')

	try {
		const queryNotifications = query(
			notificationsCollection,
			where('type', '==', type),
			where('addedBy', '==', addedBy),
			where('post.postId', '==', postId)
		)

		const notificationsSnapshot = await getDocs(queryNotifications)
		console.log(notificationsSnapshot)

		notificationsSnapshot.forEach(async doc => {
			console.log(doc.data())
			await deleteDoc(doc.ref)
			console.log(`Notification with ID ${doc.id} deleted.`)
		})
	} catch (error) {
		console.error('Error deleting notification:', error)
	}
}
