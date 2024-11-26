'use client'
import ProfileCustomButton from '../../ProfileCustomButton/ProfileCustomButton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { findChatId } from '../../../../utils/messages/findChat'
import { createNewChat } from '../../../../utils/messages/createNewChat'
interface MessageButtonProps {
	id: string
}

const MessageButton = ({ id }: MessageButtonProps) => {
	const session = useSession()
	const router = useRouter()
	const userId = session?.data?.user?.id

	const findOrCreateChat = async () => {
		if (userId) {
			const chatId = await findChatId(id, userId)
			if (chatId) {
				router.push(`/direct/${chatId}`)
			} else {
				const newChatId = await createNewChat(id, userId)
				router.push(`/direct/${newChatId}`)
			}
		}
	}

	return <ProfileCustomButton onClick={findOrCreateChat}>Message</ProfileCustomButton>
}

export default MessageButton
