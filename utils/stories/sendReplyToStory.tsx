import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
export const sendReplyToStory = async (chatId: string, inputValue: string, userId: string, storyPhoto: string) => {
	try {
		const messagesRef = collection(db, 'chats', chatId, 'messages')
		const newMessage = {
			content: inputValue,
			content_type: 'repliedToStory',
			sender: userId,
			createdAt: new Date(),
			attachments: storyPhoto,
		}
		console.log(newMessage)
		await addDoc(messagesRef, newMessage)
	} catch (error) {
		console.log(error)
	}
}
