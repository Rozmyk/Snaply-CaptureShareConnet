'use client'
import { useState } from 'react'
import DetailedSection from './DetailedSection/DetailedSection'
import { ReplyDataProps } from '../../../types'

interface DirectPageContainerProps {
	chatId?: string
}

const DirectPageContainer = ({ chatId }: DirectPageContainerProps) => {
	const [replyToUser, setReplyToUser] = useState<ReplyDataProps>({
		isReplyToMessage: false,
		content: '',
		attachments: '',
		sender: '',
		messageType: '',
		messageId: '',
		username: '',
	})

	return chatId && <DetailedSection chatId={chatId} setReplyToUser={setReplyToUser} replyToUser={replyToUser} />
}

export default DirectPageContainer
