import { db } from '@/app/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const fetchUserDataByEmail = async (userEmail: string) => {
	try {
		const q = query(collection(db, 'users'), where('email', '==', userEmail))
		const querySnapshot = await getDocs(q)

		if (!querySnapshot.empty) {
			const userDoc = querySnapshot.docs[0]
			const userData = {
				id: userDoc.id,
				image: userDoc.data().image || null,
				username: userDoc.data().username || null,
				name: userDoc.data().name || null,
				completed: userDoc.data().completed || false,
				description: userDoc.data().description || null,
				descriptionLink: userDoc.data().descriptionLink || null,
				email: userDoc.data().email || null,
				followers: userDoc.data().followers || [],
				following: userDoc.data().following || [],
				private: userDoc.data().private || false,
				savedPosts: userDoc.data().savedPosts || [],
				savedStories: userDoc.data().savedStories || [],
			}
			return userData // Zwróć poprawnie utworzony obiekt
		} else {
			console.log('Dokument nie istnieje')
			return null // Brak dokumentu
		}
	} catch (error) {
		console.error('Wystąpił błąd podczas pobierania danych użytkownika:', error)
		return null // W razie błędu zwróć null
	}
}
