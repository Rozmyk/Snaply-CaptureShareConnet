import { db } from '@/app/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function getHighlightById(highlightId: string) {
	try {
		const highlightRef = doc(db, 'highlights', highlightId)
		const highlightSnap = await getDoc(highlightRef)

		if (highlightSnap.exists()) {
			const highlightData = highlightSnap.data()

			highlightData.id = highlightId
			return highlightData
		} else {
			return null
		}
	} catch (error) {
		console.error("Błąd podczas pobierania highlight'u:", error)
	}
}
