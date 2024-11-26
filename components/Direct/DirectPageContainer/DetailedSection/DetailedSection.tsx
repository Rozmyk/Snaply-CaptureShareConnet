'use client'
import { Dispatch, SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import useMessageFetcher from './useMessageFetcher'
import useMessageListener from './useMessageListener'
import LoadingWrapper from './LoadingWrapper/LoadingWrapper'
import MessageList from './MessageList/MessageList'
import { ReplyDataProps } from '../../../../types'
interface DetailedSectionProps {
	chatId: string
	replyToUser: ReplyDataProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
}

const DetailedSection: React.FC<DetailedSectionProps> = ({ replyToUser, setReplyToUser, chatId }) => {
	const { data: session } = useSession()
	const userId = session?.user?.id

	const { messagesData, loading, otherUserData, hasMoreMessage, setMessagesData, getNextMessages } = useMessageFetcher(
		chatId,
		userId
	)
	useMessageListener(chatId, setMessagesData)

	return (
		<LoadingWrapper chatId={chatId} messagesLength={messagesData.length}>
			<MessageList
				loading={loading}
				messagesData={messagesData}
				hasMoreMessage={hasMoreMessage}
				getNextMessages={getNextMessages}
				chatId={chatId}
				otherUserData={otherUserData}
				replyToUser={replyToUser}
				setReplyToUser={setReplyToUser}
			/>
		</LoadingWrapper>
	)
}

export default DetailedSection
