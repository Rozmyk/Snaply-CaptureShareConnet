import { useEffect, Dispatch, SetStateAction } from 'react'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { SingleMessageProps } from '../../../../types'

const useMessageListener = (chatId: string, setMessagesData: Dispatch<SetStateAction<SingleMessageProps[]>>): void => {
	useEffect(() => {
		if (!chatId || !db) return

		const unsubscribe = onSnapshot(collection(db, 'chats', chatId, 'messages'), snapshot => {
			snapshot.docChanges().forEach(change => {
				if (change.type === 'modified') {
					try {
						const updatedMessage = change.doc.data() as SingleMessageProps
						updatedMessage.id = change.doc.id

						setMessagesData(prevMessages =>
							prevMessages.map(message => (message.id === change.doc.id ? updatedMessage : message))
						)
					} catch (error) {
						console.error('Error updating message: ', error)
					}
				}

				if (change.type === 'removed') {
					const messageToDelete = change.doc.id
					setMessagesData(current => current.filter(message => message.id !== messageToDelete))
				}
			})
		})

		return () => unsubscribe()
	}, [chatId, setMessagesData])

	useEffect(() => {
		if (!chatId || !db) return

		const unsubscribe = onSnapshot(
			query(collection(db, 'chats', chatId, 'messages'), where('createdAt', '>', new Date())),
			snapshot => {
				snapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						const messageToAdd = change.doc.data() as SingleMessageProps
						messageToAdd.id = change.doc.id

						setMessagesData(prevComments => [messageToAdd, ...prevComments])
					}
				})
			}
		)

		return () => unsubscribe()
	}, [chatId, setMessagesData])
}

export default useMessageListener
