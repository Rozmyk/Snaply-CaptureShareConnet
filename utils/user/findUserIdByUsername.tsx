import { db } from '@/app/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const findUserIdByUsername = async (username: string) => {
	const lowercaseUsername = username.toLowerCase()

	try {
		const usersCollection = collection(db, 'users')
		const q = query(usersCollection, where('username', '==', lowercaseUsername))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.size > 0) {
			const userDoc = querySnapshot.docs[0]
			const userId = userDoc.id

			return userId
		} else {
			console.error('Nie znaleziono użytkownika o podanym username.')
			return null
		}
	} catch (error) {
		console.error('Błąd podczas wyszukiwania użytkownika:', error)
		return null
	}
}
