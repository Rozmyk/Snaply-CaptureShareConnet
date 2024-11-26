import { collection, query, where, and, or, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
export const findChatId = async (id: string, userId: string) => {
	const chatsRef = collection(db, 'chats')
	const q = query(
		chatsRef,
		or(
			and(where('userID1', '==', id), where('userID2', '==', userId)),
			and(where('userID2', '==', id), where('userID1', '==', userId))
		)
	)

	const querySnapshot = await getDocs(q)
	if (!querySnapshot.empty) {
		const chatId = querySnapshot.docs[0].id
		return chatId
	} else {
		return null
	}
}
