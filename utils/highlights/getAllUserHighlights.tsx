import { db } from '@/app/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { SingleSavedStoryProps } from '../../types'

export async function getAllUserHighlights(userId: string): Promise<SingleSavedStoryProps[]> {
	try {
		const highlightsRef = collection(db, 'highlights')
		const q = query(highlightsRef, where('addedBy', '==', userId), orderBy('createdAt', 'desc'))
		const querySnapshot = await getDocs(q)

		const highlights: SingleSavedStoryProps[] = []
		querySnapshot.forEach(doc => {
			const data = doc.data() as Omit<SingleSavedStoryProps, 'id'>
			highlights.push({
				id: doc.id,
				...data,
			})
		})

		return highlights
	} catch (error) {
		console.error("Błąd podczas pobierania highlight'ów:", error)
		throw error
	}
}
