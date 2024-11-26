'use client'
import { Avatar, Flex, Text, useMantineColorScheme } from '@mantine/core'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useHover } from '@mantine/hooks'
import MessageTypePhoto from './MessageType/MessageTypePhoto'
import MessageTypeEmojis from './MessageType/MessageTypeEmojis'
import MessageTypeSharePost from './MessageType/MessageTypeSharePost'
import MessageTypeText from './MessageType/MessageTypeText'
import MessageTypeRepliedToStory from './MessageType/MessageTypeRepliedToStory'
import ReactToMessage from './ReactToMessage/ReactToMessage'
import MessageResponse from './MessageResponse/MessageResponse'
import { toggleViewedMessage } from '../../../../../utils/messages/toggleViewedMessage'
import SingleMessageOnHover from './SingleMessageOnHover/SingleMessageOnHover'
import { useRouter } from 'next/navigation'
import { SingleMessageProps, ReplyDataProps } from '../../../../../types'
import DateComponent from './DateComponent/DateComponent'
import { Timestamp } from 'firebase-admin/firestore'

interface SingleMessage {
	message: SingleMessageProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
	replyInfo?: ReplyDataProps
	chatId: string
	messageId: string
	showDate: boolean
	isReplyToMessage: boolean
	maxMessageWidth: number
	isLastMessage: boolean
	createdAt: Timestamp
	secondUserId: string
	viewedBy: string[]
	secondUserImage: string
	secondUserUsername: string
}

const SingleMessage = ({
	message,
	setReplyToUser,
	chatId,
	replyInfo,
	messageId,
	showDate,
	isReplyToMessage,
	maxMessageWidth,
	isLastMessage,
	createdAt,
	secondUserId,
	viewedBy,
	secondUserImage,
	secondUserUsername,
}: SingleMessage) => {
	const session = useSession()
	const userId = session?.data?.user?.id
	const { hovered, ref } = useHover()
	const isLoggedUserId = message.sender == userId
	const isViewedByUser = userId && viewedBy?.includes(userId)
	const isViewedBySecondUser = viewedBy?.includes(secondUserId)
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const redirectToProfile = (username: string) => {
		router.push(`/profile/${username}`)
	}
	useEffect(() => {
		if (!isViewedByUser && userId) {
			toggleViewedMessage(chatId, messageId, userId)
		}
	}, [chatId, messageId, userId, isViewedByUser])
	const chooseComponentToRender = (message: SingleMessageProps) => {
		switch (message.content_type) {
			case 'text':
				return <MessageTypeText content={message.content} isLoggedUserId={isLoggedUserId} maxWidth={maxMessageWidth} />

			case 'photo':
				return <MessageTypePhoto src={message.attachments} />

			case 'emoji':
				return <MessageTypeEmojis content={message.content} />
			case 'sharePost':
				return <MessageTypeSharePost postInfo={{ sender: message.sender, postId: message.postId }} />
			case 'repliedToStory':
				return (
					<MessageTypeRepliedToStory
						maxWidth={maxMessageWidth}
						senderId={message.sender}
						attachments={message.attachments}
						content={message.content}
					/>
				)
			default:
				return null
		}
	}

	return (
		<div ref={ref} style={{ width: '100%' }}>
			{showDate && createdAt && <DateComponent createdAt={createdAt} />}

			<Flex justify={isLoggedUserId ? 'flex-end' : 'flex-start'} align='center'>
				<Flex direction={isLoggedUserId ? 'row' : 'row-reverse'} align='center'>
					<Flex justify={'flex-start'} align='center' gap='md' m='sm'>
						{!isLoggedUserId && (
							<Avatar
								sx={{ cursor: 'pointer' }}
								onClick={() => {
									redirectToProfile(secondUserUsername)
								}}
								radius='50%'
								size={28}
								src={secondUserImage}></Avatar>
						)}
						<ReactToMessage
							isLoggedUserId={isLoggedUserId}
							reactions={message.reactions}
							messageId={messageId}
							chatId={chatId}>
							<Flex direction='column' align={isLoggedUserId ? 'flex-end' : 'flex-start'} justify={'center'}>
								{isReplyToMessage && replyInfo && (
									<MessageResponse maxWidth={maxMessageWidth} replyInfo={replyInfo} isLoggedUserId={isLoggedUserId} />
								)}
								<Flex align='center' direction={isLoggedUserId ? 'row' : 'row-reverse'} gap='sm'>
									{hovered && (
										<SingleMessageOnHover
											isLoggedUserId={isLoggedUserId}
											chatId={chatId}
											messageId={messageId}
											setReplyToUser={setReplyToUser}
											message={message}
										/>
									)}
									{chooseComponentToRender(message)}
								</Flex>
							</Flex>
						</ReactToMessage>
					</Flex>
				</Flex>
			</Flex>
			{isLastMessage && isViewedBySecondUser && isLoggedUserId && (
				<Text mr='sm' ml='sm' mb='sm' color={dark ? '#a8a8a8' : '#737373'} fz='xs' align='right'>
					Seen
				</Text>
			)}
		</div>
	)
}

export default SingleMessage
