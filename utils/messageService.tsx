import { db } from '@/app/firebase'
import { collection, query, orderBy, limit, startAfter, getDocs, doc, getDoc } from 'firebase/firestore'

import { fetchUserData } from './user/fetchUserData'
export default {
	async messageFirstBatch(chatId: string, userId: string) {
		try {
			const chatUsersRef = doc(db, 'chats', chatId)
			const chatDoc = await getDoc(chatUsersRef)
			const chatData = chatDoc.data()
			if (!chatData) {
				console.error('Chat document not found')
				return
			}

			let otherUserId = chatData.userID1
			if (otherUserId === userId) {
				otherUserId = chatData.userID2
			}
			let fetchedUserData
			if (otherUserId) {
				fetchedUserData = await fetchUserData(otherUserId)
			}

			const messagesRef = collection(db, 'chats', chatId, 'messages')

			const sortedQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(20))
			const data = await getDocs(sortedQuery)

			let messages = []
			let lastKey = ''
			for (const doc of data.docs) {
				const messageData = doc.data()

				messageData.id = doc.id

				messages.push({
					...messageData,
				})

				lastKey = messageData.createdAt
			}

			return { messages, lastKey, fetchedUserData }
		} catch (error) {
			console.error(error)
		}
	},

	async messageNextBatch(key: string, chatId: string) {
		try {
			const messagesRef = collection(db, 'chats', chatId, 'messages')
			const sortedQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(10), startAfter(key))

			const data = await getDocs(sortedQuery)

			let messages = []
			let lastKey = ''

			for (const doc of data.docs) {
				const messageData = doc.data()
				messageData.id = doc.id

				messages.push({
					...messageData,
				})

				lastKey = messageData.createdAt
			}

			return { messages, lastKey }
		} catch (error) {
			console.error(error)
		}
	},
}
