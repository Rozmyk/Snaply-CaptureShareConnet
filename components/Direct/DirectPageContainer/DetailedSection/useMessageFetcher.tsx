import { useEffect, useState } from 'react'
import messageService from '../../../../utils/messageService'
import { useRouter } from 'next/navigation'
import { UserProps, SingleMessageProps } from '../../../../types'

const useMessageFetcher = (chatId: string, userId: string | undefined) => {
	const [messagesData, setMessagesData] = useState<SingleMessageProps[]>([])
	const [lastKey, setLastKey] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)
	const [otherUserData, setOtherUserData] = useState<UserProps | null>(null)
	const [hasMoreMessage, setHasMoreMessage] = useState<boolean>(true)
	const router = useRouter()

	const getNextMessages = async () => {
		try {
			if (!lastKey) {
				setHasMoreMessage(false)
				return
			}

			const fetchedMessages = await messageService.messageNextBatch(lastKey, chatId)
			if (fetchedMessages) {
				const newMessages: SingleMessageProps[] = fetchedMessages.messages as SingleMessageProps[]
				setMessagesData(prevMessages => [...prevMessages, ...newMessages])
				setLastKey(fetchedMessages.lastKey)
				if (newMessages.length === 0) {
					setHasMoreMessage(false)
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		const getFirstMessages = async (chatId: string) => {
			try {
				if (userId) {
					const fetchedMessages = await messageService.messageFirstBatch(chatId, userId)
					if (fetchedMessages) {
						if (fetchedMessages.messages) {
							const validMessages: SingleMessageProps[] = fetchedMessages.messages.map(message => ({
								content: message.content || '',
								content_type: message.content_type || '',
								createdAt: message.createdAt || new Date(),
								postId: message.postId || '',
								isReplyToMessage: message.isReplyToMessage,
								replyInfo: message.replyInfo || null,
								sender: message.sender || '',
								viewedBy: message.viewedBy || [],
								reactions: message.reactions || [],
								attachments: message.attachments || '',
								id: message.id,
							}))

							setMessagesData(validMessages)
							setLastKey(fetchedMessages.lastKey || '')
							setOtherUserData(fetchedMessages.fetchedUserData || null)
							setLoading(false)
							setHasMoreMessage(validMessages.length > 0)
						} else {
							router.push('/direct')
						}
					}
				}
			} catch (err) {
				console.error(err)
			}
		}
		if (chatId) {
			getFirstMessages(chatId)
		}
	}, [chatId, userId, router])

	return { messagesData, loading, otherUserData, hasMoreMessage, setMessagesData, getNextMessages }
}

export default useMessageFetcher
