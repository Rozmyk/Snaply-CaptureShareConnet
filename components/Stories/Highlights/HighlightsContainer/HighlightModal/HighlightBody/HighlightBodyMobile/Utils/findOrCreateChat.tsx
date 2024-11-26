import { findChatId } from '../../../../../../../../utils/messages/findChat'
import { createNewChat } from '../../../../../../../../utils/messages/createNewChat'
export const findOrCreateChat = async (senderId: string, userId: string) => {
	const chatId = await findChatId(senderId, userId)
	if (chatId) {
		return chatId
	} else {
		const newChatId = await createNewChat(senderId, userId)
		return newChatId
	}
}
