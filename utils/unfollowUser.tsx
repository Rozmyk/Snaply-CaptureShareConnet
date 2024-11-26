import { db } from '@/app/firebase'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { deleteNotification } from './deleteNotification'
export const unfollowUser = async (userId: string, followerId: string) => {
	try {
		const followerRef = doc(db, 'users', followerId)
		const followingRef = doc(db, 'users', userId)

		await updateDoc(followingRef, {
			following: arrayRemove(followerId),
		})

		await updateDoc(followerRef, {
			followers: arrayRemove(userId),
		})
		// deleteNotification(followerId, 'followUser', userId)
		console.log('Użytkownik został dodany do kolekcji following i followers.')
		return true
	} catch (error) {
		console.error('Błąd podczas dodawania użytkownika:', error)
		return false
	}
}
