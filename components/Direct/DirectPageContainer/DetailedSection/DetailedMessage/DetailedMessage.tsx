'use client'
import { Dispatch, SetStateAction } from 'react'
import DetailedHeader from './DetailedHeader/DetailedHeader'
import { useElementSize } from '@mantine/hooks'
import DetailedAction from './DetailedAction/DetailedAction'
import ChatBox from './ChatBox/ChatBox'
import { Box, Flex } from '@mantine/core'
import { SingleMessageProps, ReplyDataProps, UserProps } from '../../../../../types'
interface DetailedMessageProps {
	chatData: SingleMessageProps[]
	replyToUser: ReplyDataProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
	otherUserData: UserProps | null
	chatId: string
	hasMoreMessage: boolean
	getNextMessages: () => void
}
const DetailedMessage = ({
	chatData,
	setReplyToUser,
	replyToUser,
	otherUserData,
	chatId,
	getNextMessages,
	hasMoreMessage,
}: DetailedMessageProps) => {
	const { ref: BoxRef, height: BoxHeight, width: BoxWidth } = useElementSize()
	const { ref: DetailedActionRef, height: DetailedActionHeight } = useElementSize()
	const { ref: DetailedHeaderRef, height: DetailedHeaderHeight } = useElementSize()

	return (
		<Flex ref={BoxRef} direction='column' style={{ maxHeight: '100vh', height: '100vh', maxWidth: '100%' }}>
			<Box ref={DetailedHeaderRef}>
				<DetailedHeader activeUser={otherUserData} />
			</Box>

			<Box style={{ flexGrow: 1, width: '100%', minHeight: 0, maxWidth: BoxWidth }}>
				{otherUserData && (
					<ChatBox
						chatId={chatId}
						hasMoreMessage={hasMoreMessage}
						getNextMessages={getNextMessages}
						activeUser={otherUserData}
						scrollAreaHeight={BoxHeight - DetailedActionHeight - DetailedHeaderHeight - 25}
						scrollAreaWidth={BoxWidth}
						chatData={chatData}
						setReplyToUser={setReplyToUser}
					/>
				)}
			</Box>
			<Box ref={DetailedActionRef} p='sm'>
				<DetailedAction chatId={chatId} setReplyToUser={setReplyToUser} replyToUser={replyToUser} />
			</Box>
		</Flex>
	)
}

export default DetailedMessage
