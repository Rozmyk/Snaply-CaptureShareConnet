import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/firebase'
export const createNewChat = async (userId: string, id: string) => {
	const newChatRef = await addDoc(collection(db, 'chats'), {
		userID1: userId,
		userID2: id,
	})
	return newChatRef.id
}
