import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
export async function deleteLikeNotification(otherUserId: string, type: string, addedBy: string, postId: string) {
	const notificationsCollection = collection(db, 'users', otherUserId, 'notifications')

	try {
		const queryNotifications = query(
			notificationsCollection,
			where('type', '==', type),
			where('addedBy', '==', addedBy),
			where('post.postId', '==', postId)
		)

		const notificationsSnapshot = await getDocs(queryNotifications)

		notificationsSnapshot.forEach(async doc => {
			await deleteDoc(doc.ref)
		})
	} catch (error) {
		console.error('Error deleting notification:', error)
	}
}
