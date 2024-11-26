import SingleMessage from '../../SingleMessage/SingleMessage'
import { Dispatch, SetStateAction } from 'react'
import { Loader, Center } from '@mantine/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import FreshChat from './FreshChat/FreshChat'
import { Timestamp } from 'firebase-admin/firestore'
import { SingleMessageProps, ReplyDataProps, UserProps } from '../../../../../../types'
interface ChatBoxProps {
	chatData: SingleMessageProps[]
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
	chatId: string
	scrollAreaHeight: number
	scrollAreaWidth: number
	hasMoreMessage: boolean
	getNextMessages: () => void
	activeUser: UserProps
}
const ChatBox = ({
	chatData,
	activeUser,
	setReplyToUser,
	scrollAreaHeight,
	scrollAreaWidth,
	getNextMessages,
	hasMoreMessage,
	chatId,
}: ChatBoxProps) => {
	let previousDate: Timestamp | null = null
	const next = async () => {
		await getNextMessages()
	}
	const CheckTimeDifference = (timestamp1: Timestamp, timestamp2: Timestamp | null) => {
		if (!timestamp1 || !timestamp2) {
			return false
		}

		if (!timestamp1.seconds || !timestamp1.nanoseconds || !timestamp2.seconds || !timestamp2.nanoseconds) {
			return false
		}

		const milliseconds1 = timestamp1.seconds * 1000 + Math.floor(timestamp1.nanoseconds / 1e6)
		const milliseconds2 = timestamp2.seconds * 1000 + Math.floor(timestamp2.nanoseconds / 1e6)
		const timeDifference = Math.abs(milliseconds1 - milliseconds2)
		const fiveHoursInMilliseconds = 5 * 60 * 60 * 1000
		return timeDifference > fiveHoursInMilliseconds
	}

	const renderedMessages = chatData.map((message, index) => {
		const showDate = CheckTimeDifference(message.createdAt, previousDate)
		previousDate = message.createdAt

		return (
			<SingleMessage
				isReplyToMessage={message.isReplyToMessage}
				key={message.id}
				isLastMessage={index === 0}
				maxMessageWidth={scrollAreaWidth * 0.65}
				showDate={showDate}
				replyInfo={message.replyInfo}
				secondUserId={activeUser.id}
				secondUserImage={activeUser.image}
				secondUserUsername={activeUser.username}
				message={message}
				createdAt={message.createdAt}
				viewedBy={message.viewedBy}
				chatId={chatId}
				messageId={message.id}
				setReplyToUser={setReplyToUser}></SingleMessage>
		)
	})

	return (
		<div
			id='scrollableDiv'
			style={{
				height: scrollAreaHeight,
				maxHeight: scrollAreaHeight,
				overflow: 'auto',
				display: 'flex',
				flexDirection: 'column-reverse',
				maxWidth: scrollAreaWidth,
			}}>
			<InfiniteScroll
				next={next}
				hasMore={hasMoreMessage}
				style={{ display: 'flex', flexDirection: 'column-reverse' }}
				inverse={true}
				loader={
					<Center m='md'>
						<Loader size='sm' color='gray'></Loader>
					</Center>
				}
				scrollableTarget='scrollableDiv'
				dataLength={chatData.length}>
				{renderedMessages}
				{chatData.length <= 5 && <FreshChat activeUser={activeUser}></FreshChat>}
			</InfiniteScroll>
		</div>
	)
}

export default ChatBox
