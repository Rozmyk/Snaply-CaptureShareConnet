import { Dispatch, SetStateAction } from 'react'
import { Box } from '@mantine/core'
import DetailedMessage from '../DetailedMessage/DetailedMessage'
import DetailedMessageLoading from '../DetailedMessage/DetailedMessageLoading/DetailedMessageLoading'
import { UserProps, SingleMessageProps, ReplyDataProps } from '../../../../../types'

interface MessageListProps {
	loading: boolean
	messagesData: SingleMessageProps[]
	hasMoreMessage: boolean
	getNextMessages: () => void
	chatId: string
	otherUserData: UserProps | null
	replyToUser: ReplyDataProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
}

const MessageList: React.FC<MessageListProps> = ({
	loading,
	messagesData,
	hasMoreMessage,
	getNextMessages,
	chatId,
	otherUserData,
	replyToUser,
	setReplyToUser,
}) => {
	return (
		<Box sx={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
			{loading ? (
				<DetailedMessageLoading />
			) : (
				<DetailedMessage
					hasMoreMessage={hasMoreMessage}
					getNextMessages={getNextMessages}
					chatId={chatId}
					otherUserData={otherUserData}
					chatData={messagesData}
					replyToUser={replyToUser}
					setReplyToUser={setReplyToUser}
				/>
			)}
		</Box>
	)
}

export default MessageList
