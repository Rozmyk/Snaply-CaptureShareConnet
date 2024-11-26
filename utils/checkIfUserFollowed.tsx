import { db } from '@/app/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const checkIfUserFollowed = async (userId: string, otherUserId: string) => {
	try {
	
		const userRef = doc(db, 'users', userId)
		const userSnapshot = await getDoc(userRef)

		if (userSnapshot.exists()) {
			const userData = userSnapshot.data()
			const following = userData.following || []

			return following.includes(otherUserId)
		} else {
			return false
		}
	} catch (error) {
		console.error('Błąd podczas sprawdzania użytkownika:', error)
		return false
	}
}
